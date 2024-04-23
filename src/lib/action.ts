"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { authInfo } from "@/lib/model";
import { z } from "zod";

const FullFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(3, { message: "Must be 3 or more characters long" }),
  repassword: z
    .object({
      password: z.string(),
      confirm: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      }),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
    }),
});
const FormSchema = FullFormSchema.omit({ repassword: true });
const magiclinkForm = FullFormSchema.omit({ password: true, repassword: true });
const resetpasswordForm = FullFormSchema.omit({ email: true, password: true });

export async function login(prevState: authInfo, formData: FormData) {
  // Validate form using Zod
  const supabase = createClient();

  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { email, password } = validatedFields.data;

  try {
    const { data: dataUser, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (dataUser) {
      console.log(dataUser);
    }
    if (error) {
      console.log(error);
      redirect("/error");
    }
  } catch (error) {
    console.log("Error in credentials");
    return {
      message: "Error in credentials",
    };
  }
  console.log("revalidate signup function");
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(prevState: authInfo, formData: FormData) {
  const supabase = createClient();

  const validatedFields = FullFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    repassword: {
      password: formData.get("password"),
      confirm: formData.get("re-password"),
    },
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  console.log(validatedFields.data);
  // Prepare data for insertion into the database
  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);

    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    console.log("logged Out");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function magicLink(prevState: authInfo, formData: FormData) {
  const validatedFields = magiclinkForm.safeParse({
    email: formData.get("email"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  console.log(validatedFields.success);
  // Prepare data for insertion into the database
  const { email } = validatedFields.data;

  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });
    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
    return {
      message: "Magic Link  Sent! Please Check Your Email.",
    };
  } catch (error) {
    console.log("Error in credentials");
    return {
      message: "Error in credentials",
    };
  }
}

export async function resetpassword(prevState: authInfo, formData: FormData) {
  const validatedFields = magiclinkForm.safeParse({
    email: formData.get("email"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  console.log(validatedFields.success);
  // Prepare data for insertion into the database
  const { email } = validatedFields.data;

  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:3000/reset`,
    });
    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
    return {
      message: "Magic Link  Sent! Please Check Your Email.",
    };
  } catch (error) {
    console.log("Error in credentials");
    return {
      message: "Error in credentials",
    };
  }
}
export async function confirmpassword(prevState: authInfo, formData: FormData) {
  const validatedFields = resetpasswordForm.safeParse({
    repassword: {
      password: formData.get("password"),
      confirm: formData.get("re-password"),
    },
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  console.log(validatedFields.success);
  // Prepare data for insertion into the database
  const { password } = validatedFields.data.repassword;

  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (data) {
      console.log(data);
      return {
        message: "Magic Link  Sent! Please Check Your Email.",
      };
    }
    if (error) {
      console.log(error);
    }
    return {
      message: "Magic Link  Sent! Please Check Your Email.",
    };
  } catch (error) {
    console.log("Error in credentials");
    return {
      message: "Error in credentials",
    };
  }
}
