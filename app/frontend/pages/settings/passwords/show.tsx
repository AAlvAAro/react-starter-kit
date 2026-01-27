import { Transition } from "@headlessui/react"
import { Form, Head } from "@inertiajs/react"

import HeadingSmall from "@/components/heading-small"
import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import SettingsLayout from "@/layouts/settings/layout"
import { settingsPasswordPath } from "@/routes"
import { t } from "@/lib/i18n"
export default function Password() {
  return (
    <DashboardLayout>
      <Head title={t("settings.password")} />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title={t("settings.password.title")}
            description={t("settings.password.subtitle")}
          />

          <Form
            method="put"
            action={settingsPasswordPath()}
            options={{
              preserveScroll: true,
            }}
            resetOnError
            resetOnSuccess
            className="space-y-6"
          >
            {({ errors, processing, recentlySuccessful }) => (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="password_challenge">{t("settings.password.current")}</Label>

                  <Input
                    id="password_challenge"
                    name="password_challenge"
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                    placeholder={t("settings.password.current_placeholder")}
                  />

                  <InputError messages={errors.password_challenge} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">{t("settings.password.new")}</Label>

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    placeholder={t("settings.password.new_placeholder")}
                  />

                  <InputError messages={errors.password} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password_confirmation">
                    {t("settings.password.confirm")}
                  </Label>

                  <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    placeholder={t("settings.password.confirm_placeholder")}
                  />

                  <InputError messages={errors.password_confirmation} />
                </div>

                <div className="flex items-center gap-4">
                  <Button disabled={processing}>{t("settings.password.save")}</Button>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-neutral-600">{t("settings.password.saved")}</p>
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
