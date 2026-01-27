import { Form, Head } from "@inertiajs/react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { signInPath, signUpPath } from "@/routes"
import { t } from "@/lib/i18n"

export default function Register() {
  return (
    <AuthLayout
      title={t("auth.signup.title")}
      description={t("auth.signup.description")}
    >
      <Head title={t("auth.sign_up")} />
      <Form
        method="post"
        action={signUpPath()}
        resetOnSuccess={["password", "password_confirmation"]}
        disableWhileProcessing
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">{t("auth.signup.name")}</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="name"
                  disabled={processing}
                  placeholder={t("auth.signup.name_placeholder")}
                />
                <InputError messages={errors.name} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">{t("auth.signup.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  placeholder={t("auth.signup.email_placeholder")}
                />
                <InputError messages={errors.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">{t("auth.signup.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={3}
                  autoComplete="new-password"
                  placeholder={t("auth.signup.password_placeholder")}
                />
                <InputError messages={errors.password} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">{t("auth.signup.password_confirmation")}</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  required
                  tabIndex={4}
                  autoComplete="new-password"
                  placeholder={t("auth.signup.password_confirmation_placeholder")}
                />
                <InputError messages={errors.password_confirmation} />
              </div>

              <Button type="submit" className="mt-2 w-full" tabIndex={5}>
                {processing && <Spinner />}
                {t("auth.signup.button")}
              </Button>
            </div>

            <div className="text-muted-foreground text-center text-sm">
{t("auth.have_account")}{" "}
              <TextLink href={signInPath()} tabIndex={6}>
                {t("auth.sign_in")}
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
