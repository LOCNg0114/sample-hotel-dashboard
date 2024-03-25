// AuthProvider.tsx

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/router";

interface IAuth {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    loading: boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: null,
    loading: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const router = useRouter();

    // Persisting the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
                // console.log("User logged in:", user.email);    
                router.push("/");
            } else {
                setUser(null);
                setLoading(true);
                // console.log("User logged out");
                if (router.pathname !== "/login") {
                    router.push("/login"); // Redirect to login if user is not logged in
                }
            }

            setInitialLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUp = async (email: string, password: string) => {
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(userCredential.user);
            setLoading(false);
            router.push("/");
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(userCredential.user);
            setLoading(false);
            router.push("/");
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);

        try {
            await signOut(auth);
            setUser(null);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    const memoedValue = useMemo(
        () => ({
            user,
            signUp,
            signIn,
            loading,
            logout,
            error,
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}