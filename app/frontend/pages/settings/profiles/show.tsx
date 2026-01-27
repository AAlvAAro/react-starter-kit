import { Transition } from "@headlessui/react"
import { Form, Head, usePage } from "@inertiajs/react"

import DeleteUser from "@/components/delete-user"
import HeadingSmall from "@/components/heading-small"
import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import SettingsLayout from "@/layouts/settings/layout"
import { settingsProfilePath } from "@/routes"
import { t } from "@/lib/i18n"

export default function Profile() {
  const { auth } = usePage().props

  return (
    <DashboardLayout>
      <Head title={t("settings.profile")} />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title={t("settings.profile.title")}
            description={t("settings.profile.subtitle")}
          />

          <Form
            method="patch"
            action={settingsProfilePath()}
            options={{
              preserveScroll: true,
            }}
            className="space-y-6"
          >
            {({ errors, processing, recentlySuccessful }) => (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("settings.profile.name")}</Label>

                  <Input
                    id="name"
                    name="name"
                    className="mt-1 block w-full"
                    defaultValue={auth.user.name}
                    required
                    autoComplete="name"
                    placeholder={t("settings.profile.name_placeholder")}
                  />

                  <InputError className="mt-2" messages={errors.name} />
                </div>

                <div className="flex items-center gap-4">
                  <Button disabled={processing}>{t("settings.profile.save")}</Button>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-neutral-600">{t("settings.profile.saved")}</p>
                  </Transition>
                </div>
              </>
            )}
          </Form>
        </div>

        <DeleteUser />
      </SettingsLayout>
    </DashboardLayout>
  )
}
