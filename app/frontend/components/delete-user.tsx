import { Form } from "@inertiajs/react"
import { useRef } from "react"

import HeadingSmall from "@/components/heading-small"
import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usersPath } from "@/routes"
import { t } from "@/lib/i18n"

export default function DeleteUser() {
  const passwordInput = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-6">
      <HeadingSmall
        title={t("settings.delete.title")}
        description={t("settings.delete.subtitle")}
      />
      <div className="space-y-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <div className="relative space-y-0.5 text-destructive">
          <p className="font-medium">{t("settings.delete.warning")}</p>
          <p className="text-sm">
            {t("settings.delete.warning_text")}
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">{t("settings.delete.button")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              {t("settings.delete.dialog_title")}
            </DialogTitle>
            <DialogDescription>
              {t("settings.delete.dialog_description")}
            </DialogDescription>
            <Form
              method="delete"
              action={usersPath()}
              options={{
                preserveScroll: true,
              }}
              onError={() => passwordInput.current?.focus()}
              resetOnSuccess
              className="space-y-6"
            >
              {({ resetAndClearErrors, processing, errors }) => (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="password_challenge" className="sr-only">
                      {t("settings.delete.password_label")}
                    </Label>

                    <Input
                      id="password_challenge"
                      type="password"
                      name="password_challenge"
                      ref={passwordInput}
                      placeholder={t("settings.delete.password_placeholder")}
                      autoComplete="current-password"
                    />

                    <InputError messages={errors.password_challenge} />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        onClick={() => resetAndClearErrors()}
                      >
                        {t("settings.delete.cancel")}
                      </Button>
                    </DialogClose>

                    <Button variant="destructive" disabled={processing} asChild>
                      <button type="submit">{t("settings.delete.button")}</button>
                    </Button>
                  </DialogFooter>
                </>
              )}
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
