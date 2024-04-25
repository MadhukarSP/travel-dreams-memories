import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSideBar = () => {
    const { pathname } = useLocation()
    const { mutateAsync: signOutAccount, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) navigate('/sign-in');
    }, [isSuccess]);

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to="/" className="flex gap-3 items-center">
                    <img
                        src="/assets/images/tdm.svg"
                        alt="logo"
                        width={200}
                        height={40}
                    />
                </Link>
                <Link to="/" className="flex gap-3 items-center">
                    <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="user Image" className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col" >
                        <p className="body-bold">{user.name}</p>
                        <p className="small-regular text-light-3">@{user.username}</p>
                    </div>
                </Link>
                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                                <NavLink to={link.route} className="flex items-center gap-4 p-4">
                                    <img src={link.imgURL} alt="icon" className={`group-hover:invert-white  ${isActive && 'invert-white'}`} />
                                    <p className="body-bold">{link.label}</p>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Button
                onClick={() => signOutAccount()}
                className="shad-button_ghost"
                variant="ghost">
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className="small-medium lg:base-medium">Log Out</p>
            </Button>
        </nav>
    )
}

export default LeftSideBar