import supabase from "./supabase";

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
