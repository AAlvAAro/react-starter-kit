import { Form, Head } from "@inertiajs/react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { identityPasswordResetPath, signInPath } from "@/routes"
import { t } from "@/lib/i18n"

export default function ForgotPassword() {
  return (
    <AuthLayout
      title={t("auth.password_reset.title")}
      description={t("auth.password_reset.description")}
    >
      <Head title={t("auth.password_reset.title")} />

      <div className="space-y-6">
        <Form method="post" action={identityPasswordResetPath()}>
          {({ processing, errors }) => (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email">{t("auth.password_reset.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  autoFocus
                  placeholder={t("auth.password_reset.email_placeholder")}
                />
                <InputError messages={errors.email} />
              </div>

              <div className="my-6 flex items-center justify-start">
                <Button className="w-full" disabled={processing}>
                  {processing && <Spinner />}
                  {t("auth.password_reset.button")}
                </Button>
              </div>
            </>
          )}
        </Form>
        <div className="text-muted-foreground space-x-1 text-center text-sm">
<span>{t("auth.password_reset.return")}</span>
          <TextLink href={signInPath()}>{t("auth.password_reset.login")}</TextLink>
        </div>
      </div>
    </AuthLayout>
  )
}
