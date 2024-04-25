import { Outlet, Navigate } from "react-router-dom"

const AuthLayout = () => {
    const isAuthenticated = false;

    return (
        <>
            {isAuthenticated ?
                <Navigate to="/" /> : (
                    <>
                        <img
                            src="/assets/images/hallstatt.jpg
                        " alt="travel-img" className="hidden w-1/2 h-screen xl:block object-cover bg-no-repeat"
                        />
                        <section className="flex flex-1 justify-center items-center flex-col py-10">
                            <Outlet />
                        </section>
                    </>
                )
            }
        </>
    )
}

export default AuthLayout