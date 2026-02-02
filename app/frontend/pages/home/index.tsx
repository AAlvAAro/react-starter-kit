import { Head, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <Head title="Welcome" />
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">Get started by signing in or creating an account.</p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/sign_in">Sign In</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sign_up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}