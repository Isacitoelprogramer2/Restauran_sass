"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    nombres: "",
    correo: "",
    contraseña: "",
    repetirContraseña: ""
  })
    const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    if (isLogin) {
      try {
        const { login } = await import("@/lib/firebase/auth")
        await login(formData.correo, formData.contraseña)
          router.push("/dashboard")
      } catch (err: unknown) {
        setError((err as Error).message || "Error al iniciar sesión")
      }
    } else {
      if (formData.contraseña !== formData.repetirContraseña) {
        setError("Las contraseñas no coinciden")
        setLoading(false)
        return
      }
      try {
        const { register } = await import("@/lib/firebase/auth")
        const user = await register(formData.correo, formData.contraseña)
        const { createDocument } = await import("@/lib/firebase/firestore")
        await createDocument("users", {
          uid: user.uid,
          name: formData.nombres,
          email: formData.correo,
          provider: "email"
        })
          router.push("/dashboard")
      } catch (err: unknown) {
        setError((err as Error).message || "Error al registrar usuario")
      }
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setError(null)
    setLoading(true)
    try {
      const { loginWithGoogle } = await import("@/lib/firebase/auth")
      await loginWithGoogle()
        router.push("/dashboard")
    } catch (err: unknown) {
      setError((err as Error).message || "Error con Google")
    }
    setLoading(false)
  }

  return (
    <div className={cn("flex flex-col gap-6 text-white", className)} {...props}>
      <Card className="bg-neutral-800 border-neutral-700">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">
            {isLogin ? "Bienvenido de nuevo" : "Crear cuenta"}
          </CardTitle>
          <CardDescription className="text-neutral-300">
            {isLogin
              ? "Inicia sesión con tu cuenta con tu correo o Google"
              : "Regístrate con tu correo y contraseña"}
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-neutral-800">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-300"
                  type="button"
                  onClick={handleGoogle}
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  {isLogin ? "Iniciar sesión con Google" : "Regístrate con Google"}
                </Button>
              </div>
              
              <div className="after:border-neutral-600 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-neutral-800 text-neutral-300 relative z-10 px-2">
                  {isLogin ? "O continúa con" : "O regístrate con"}
                </span>
              </div>
              
              <div className="grid gap-6">
                {error && (
                  <div className="text-red-400 text-sm text-center">{error}</div>
                )}
                {!isLogin && (
                  <div className="grid gap-3">
                    <Label htmlFor="nombres" className="text-white">Nombres</Label>
                    <Input
                      id="nombres"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={formData.nombres}
                      onChange={handleInputChange}
                      required
                      className="bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400"
                    />
                  </div>
                )}
                
                <div className="grid gap-3">
                  <Label htmlFor="correo" className="text-white">Correo electrónico</Label>
                  <Input
                    id="correo"
                    type="email"
                    placeholder="m@ejemplo.com"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                    className="bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400"
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="contraseña" className="text-white">
                    {isLogin ? "Contraseña" : "Contraseña"}
                  </Label>
                  <Input
                    id="contraseña"
                    type="password"
                    value={formData.contraseña}
                    onChange={handleInputChange}
                    required
                    className="bg-neutral-700 border-neutral-600 text-white"
                  />
                </div>
                
                {!isLogin && (
                  <div className="grid gap-3">
                    <Label htmlFor="repetirContraseña" className="text-white">Repetir contraseña</Label>
                    <Input
                      id="repetirContraseña"
                      type="password"
                      value={formData.repetirContraseña}
                      onChange={handleInputChange}
                      required
                      className="bg-neutral-700 border-neutral-600 text-white"
                    />
                  </div>
                )}
                
                {isLogin && (
                  <div className="flex items-center">
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline text-neutral-300 hover:text-white"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full bg-neutral-100 hover:bg-neutral-600 text-black"
                  disabled={loading}
                >
                  {loading ? (isLogin ? "Iniciando..." : "Registrando...") : (isLogin ? "Iniciar sesión" : "Registrarse")}
                </Button>
              </div>
              
              <div className="text-center text-sm text-white/60">
                {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsLogin(!isLogin)
                    setFormData({
                      nombres: "",
                      correo: "",
                      contraseña: "",
                      repetirContraseña: ""
                    })
                  }}
                  className="underline underline-offset-4 text-neutral-100 hover:text-white"
                >
                  {isLogin ? "Regístrate" : "Inicia sesión"}
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-neutral-400 *:[a]:hover:text-white text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:text-neutral-300">
        Al hacer clic en continuar, aceptas nuestros <a href="#">Términos de servicio</a>{" "}
        y <a href="#">Política de privacidad</a>.
      </div>
    </div>
  )
}
