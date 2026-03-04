import { Form, Head } from "@inertiajs/react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { identityPasswordResetPath, signInPath } from "@/routes"

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your email to receive a password reset link"
    >
      <Head title="Forgot Password" />

      <div className="space-y-6">
        <Form method="post" action={identityPasswordResetPath()}>
          {({ processing, errors }) => (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  autoFocus
                  placeholder="email@example.com"
                />
                <InputError messages={errors.email} />
              </div>

              <div className="my-6 flex items-center justify-start">
                <Button className="w-full" disabled={processing}>
                  {processing && <Spinner />}
                  Send Reset Link
                </Button>
              </div>
            </>
          )}
        </Form>
        <div className="text-muted-foreground space-x-1 text-center text-sm">
          <span>Remember your password?</span>
          <TextLink href={signInPath()}>Sign In</TextLink>
        </div>
      </div>
    </AuthLayout>
  )
}
