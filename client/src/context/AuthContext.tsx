import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export type AuthContextType = {
    isAuthenticated: boolean, 
    loading: boolean,
    checkAuth: () => Promise<void>
    setIsAuthenticated: (v: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined) 

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/me", {
                credentials: "include"
            });

            if (!res.ok) {
                setIsAuthenticated(false)
                return
            }

            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, checkAuth, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}