import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullName }) {
  const currentSession = await supabase.auth.getSession();
  const accessToken = currentSession.data.session?.access_token;
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: fullName,
        avatar: "",
      },
    },
  });

  if (accessToken) {
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: currentSession.data.session?.refresh_token,
    });
  }

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateUser({ name, avatar }) {
  const { data: nameData, error: nameError } = await supabase.auth.updateUser({
    data: { name },
  });

  if (nameError) throw new Error(nameError.message);

  const avatarName = avatar
    ? `${Math.random()}-${avatar.name}`.replaceAll("/", "")
    : null;

  if (!avatar) return nameData;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: avatarData, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${avatarName}`,
      },
    });

  if (storageError) throw new Error(avatarError.message);

  return { nameData, avatarData };
}
