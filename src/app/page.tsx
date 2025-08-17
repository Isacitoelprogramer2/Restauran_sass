import CustomNavbar from "@/components/custom-navbar";
import { CustomHeroSection } from "@/components/custom-hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <CustomNavbar />
      <CustomHeroSection />

      {/* Features Section */}
      <main className="container mx-auto px-6 pb-20 pt-16">
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Características principales</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo Restauran_sass puede transformar la gestión de tu restaurante
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border border-border hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary">
            <CardHeader>
              <CardTitle>Recetas</CardTitle>
              <CardDescription>Guarda y comparte recetas con instrucciones y costos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Organiza tus recetas por categoría y calcula márgenes automáticamente.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card">Crear receta</Button>
            </CardFooter>
          </Card>

          <Card className="bg-card border border-border hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary">
            <CardHeader>
              <CardTitle>Inventario</CardTitle>
              <CardDescription>Controla ingredientes y precios en tiempo real.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Alertas por stock bajo y reportes exportables.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card">Administrar</Button>
            </CardFooter>
          </Card>

          <Card className="bg-card border border-border hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary">
            <CardHeader>
              <CardTitle>Proyecciones</CardTitle>
              <CardDescription>Analiza ventas y optimiza costos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Gráficas y proyecciones para tomar mejores decisiones.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card">Ver proyecciones</Button>
            </CardFooter>
          </Card>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros usuarios</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Descubre cómo Restauran_sass ha ayudado a otros restaurantes a optimizar sus operaciones
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card border border-border">
              <CardContent className="pt-6">
                <p className="text-muted-foreground italic">
                  "Restauran_sass nos ha permitido reducir nuestros costos operativos en un 15% en solo tres meses.
                  La proyección de flujo de caja es increíblemente precisa."
                </p>
                <div className="mt-4">
                  <p className="font-semibold">María González</p>
                  <p className="text-sm text-muted-foreground">Gerente, Restaurante El Sabor</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border">
              <CardContent className="pt-6">
                <p className="text-muted-foreground italic">
                  "La gestión de inventario nunca había sido tan fácil. Las alertas de stock bajo nos han
                  ayudado a evitar pérdidas por vencimiento de ingredientes."
                </p>
                <div className="mt-4">
                  <p className="font-semibold">Carlos Rodríguez</p>
                  <p className="text-sm text-muted-foreground">Chef, Bistro Mediterráneo</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border">
              <CardContent className="pt-6">
                <p className="text-muted-foreground italic">
                  "Las proyecciones de ventas nos han permitido optimizar nuestra compra de ingredientes
                  y reducir el desperdicio en un 20%. Una herramienta indispensable."
                </p>
                <div className="mt-4">
                  <p className="font-semibold">Ana Martínez</p>
                  <p className="text-sm text-muted-foreground">Propietaria, Café Aromas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Planes y Precios</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Elige el plan que mejor se adapte a las necesidades de tu restaurante
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary">
              <CardHeader>
                <CardTitle className="text-xl">Básico</CardTitle>
                <CardDescription>Perfecto para pequeños restaurantes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">$29<span className="text-sm font-normal">/mes</span></p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Gestión de hasta 50 recetas
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Inventario básico
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Reportes mensuales
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card">Comenzar</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-card border-2 border-primary shadow-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <CardHeader>
                <CardTitle className="text-xl">Profesional</CardTitle>
                <CardDescription>Ideal para restaurantes medianos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">$79<span className="text-sm font-normal">/mes</span></p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Gestión ilimitada de recetas
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Inventario avanzado
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Proyecciones de ventas
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Alertas personalizadas
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Soporte prioritario
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card">Comenzar</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary">
              <CardHeader>
                <CardTitle className="text-xl">Empresarial</CardTitle>
                <CardDescription>Para cadenas de restaurantes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">Personalizado</p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Múltiples ubicaciones
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Integraciones personalizadas
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Análisis avanzado
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                    Soporte dedicado
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card">Contactar</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-4">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-12">
            Encuentra respuestas a las preguntas más comunes sobre Restauran_sass
          </p>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary">
              <CardHeader>
                <CardTitle>¿Cómo se calculan los costos de las recetas?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nuestro sistema calcula automáticamente los costos de las recetas basándose en los precios
                  de los ingredientes y las cantidades utilizadas. Puedes actualizar los precios de los
                  ingredientes en tiempo real para mantener los cálculos precisos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary">
              <CardHeader>
                <CardTitle>¿Puedo importar mis recetas existentes?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sí, ofrecemos una función de importación que te permite cargar tus recetas existentes
                  desde un archivo CSV o Excel. Nuestro equipo de soporte también puede ayudarte con
                  la migración de datos si tienes un volumen grande de recetas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary">
              <CardHeader>
                <CardTitle>¿Qué tipo de soporte ofrecen?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ofrecemos soporte por correo electrónico y chat en vivo durante horario comercial.
                  Los planes Profesional y Empresarial incluyen soporte prioritario y dedicado
                  respectivamente. También tenemos una base de conocimiento extensa y tutoriales en video.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-24 text-center bg-dark rounded-lg p-8 md:p-12 border border-neutral-700">
          <h2 className="text-3xl font-bold mb-4">¿Listo para optimizar tu restaurante?</h2>
          <p className="text-primar max-w-2xl mx-auto mb-8">
            Únete a cientos de restaurantes que ya están usando Restauran_sass para mejorar su rentabilidad
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" size="lg" className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">Comenzar ahora</Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
              Solicitar demo
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 mt-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Restauran_sass — Hecho con ❤️
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">Términos</a>
              <a href="#" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">Privacidad</a>
              <a href="#" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
