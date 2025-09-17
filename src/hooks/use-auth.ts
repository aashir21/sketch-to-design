import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

const signUpSchema = z.object({
    firstName: z.string().min(2, "First Name must be at least 2 characters long").max(16, "First Name must be max 12 characters long"),
    lastName: z.string().min(2, "Last Name must be at least 2 characters long").max(16, "Last Name must be max 12 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

type SignInData = z.infer<typeof signInSchema>
type SignUpData = z.infer<typeof signUpSchema>

export const useAuth = () => {

    const { signIn, signOut } = useAuthActions();

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const signInForm = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    const signUpForm = useForm<SignUpData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
    })

    const handleSignIn = async (data: SignInData) => {
        setIsLoading(true)
        try {
            await signIn('password', {
                email: data.email,
                password: data.password,
                flow: "signIn"
            })

            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            signInForm.setError('password', {
                message: "Invalid email or password"
            })
            toast.error("Invalid email or password")
        } finally {
            setIsLoading(false);
        }
    }

    const handleSignUp = async (data: SignUpData) => {
        setIsLoading(true)

        try {

            await signIn('password', {
                email: data.email,
                password: data.password,
                name: `${data.firstName} ${data.lastName}`,
                flow: "signUp"
            })

            router.push("/dashboard");

        } catch (error) {
            console.error(error);
            signInForm.setError('root', {
                message: "Failed to create account. Email may already exist"
            })
            toast.error("Failed to create account. Email may already exist")
        } finally {
            setIsLoading(false)
        }

    }

    const handleSignOut = async () => {

        try {
            await signOut();
        } catch (error) {
            console.error("Sign out error: ", error);
        }

    }

    return {
        signInForm,
        signUpForm,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        isLoading,
    }
}