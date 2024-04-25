
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useUserContext } from "@/context/AuthContext"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { SignInValidationSchema } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom"

const SignInForm = () => {
    const { toast } = useToast();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const { mutateAsync: signInAccount } = useSignInAccount();
    const navigate = useNavigate();

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignInValidationSchema>>({
        resolver: zodResolver(SignInValidationSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignInValidationSchema>) {
        const session = await signInAccount({ email: values.email, password: values.password });

        if (!session) {
            return toast({ title: "Sign in failed, please try again." });
        }

        const isLoggedIn = await checkAuthUser();

        if (isLoggedIn) {
            form.reset();
            navigate('/');
        } else {
            toast({ title: "Sign in failed, please try again." });
            return;
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/tdm.svg" alt="travel-dm logo" className="sm:h-15 h-16" />
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-4">Log in to your account</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">Please enter your login credentials</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter your email address" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter password" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary">
                        {isUserLoading ? (
                            <div className="flex-center gap-2">
                                <Loader /> Loading ...
                            </div>
                        ) : "Log In"}
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Don't have an account?{" "}
                        <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign Up</Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default SignInForm