import { Transition } from "@headlessui/react"
import { Form, Head, Link, usePage } from "@inertiajs/react"

import HeadingSmall from "@/components/heading-small"
import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import SettingsLayout from "@/layouts/settings/layout"
import { identityEmailVerificationPath, settingsEmailPath } from "@/routes"
import { t } from "@/lib/i18n"

export default function Email() {
  const { auth } = usePage().props

  return (
    <DashboardLayout>
      <Head title={t("settings.email")} />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title={t("settings.email.title")}
            description={t("settings.email.subtitle")}
          />

          <Form
            method="patch"
            action={settingsEmailPath()}
            options={{
              preserveScroll: true,
            }}
            resetOnError={["password_challenge"]}
            resetOnSuccess={["password_challenge"]}
            className="space-y-6"
          >
            {({ errors, processing, recentlySuccessful }) => (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("settings.email.label")}</Label>

                  <Input
                    id="email"
                    type="email"
                    name="email"
                    className="mt-1 block w-full"
                    defaultValue={auth.user.email}
                    required
                    autoComplete="username"
                    placeholder={t("settings.email.placeholder")}
                  />

                  <InputError className="mt-2" messages={errors.email} />
                </div>

                {!auth.user.verified && (
                  <div>
                    <p className="text-muted-foreground -mt-4 text-sm">
                      {t("settings.email.unverified")}{" "}
                      <Link
                        href={identityEmailVerificationPath()}
                        method="post"
                        as="button"
                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                      >
                        {t("settings.email.resend")}
                      </Link>
                    </p>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="password_challenge">{t("settings.email.current_password")}</Label>

                  <Input
                    id="password_challenge"
                    name="password_challenge"
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                    placeholder={t("settings.email.current_password_placeholder")}
                  />

                  <InputError messages={errors.password_challenge} />
                </div>

                <div className="flex items-center gap-4">
                  <Button disabled={processing}>{t("settings.email.save")}</Button>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-neutral-600">{t("settings.email.saved")}</p>
                  </Transition>
                </div>
              </>
            )}
          </Form>
        </div>
      </SettingsLayout>
    </DashboardLayout>
  )
}
