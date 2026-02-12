import { usePage } from "@inertiajs/react";

interface Translations {
  common: {
    back?: string;
    search?: string;
    loading?: string;
    save?: string;
    cancel?: string;
    delete?: string;
    edit?: string;
    settings?: string;
    logout?: string;
    profile?: string;
  };
  nav: {
    home?: string;
    instagram?: string;
    dashboard?: string;
    pricing?: string;
  };
  instagram: {
    search?: {
      title?: string;
      subtitle?: string;
      placeholder?: string;
      button?: string;
      searching?: string;
    };
    history?: {
      title?: string;
      empty?: string;
    };
    profile?: {
      followers?: string;
      posts?: string;
      following?: string;
      back_to_searches?: string;
    };
    tabs?: {
      overview?: string;
      insights?: string;
      prep?: string;
    };
    overview?: {
      title?: string;
      description?: string;
      bio?: string;
    };
    insights?: {
      generating?: string;
      tone?: string;
      confidence?: string;
      topics?: string;
      words?: string;
      personality?: string;
      posture?: string;
      interests?: string;
      flags?: string;
    };
    strategy?: {
      title?: string;
      subtitle?: string;
      generating?: string;
      icebreaker?: {
        title?: string;
        subtitle?: string;
        generating?: string;
        start_typing?: string;
        chatting_as?: string;
        reset?: string;
        change_persona?: string;
        type_message?: string;
      };
    };
  };
  auth: {
    sign_in?: string;
    sign_up?: string;
    sign_out?: string;
    email?: string;
    password?: string;
    forgot_password?: string;
    no_account?: string;
    have_account?: string;
  };
}

interface PageProps {
  translations: Translations;
  locale: string;
  available_locales: string[];
}

export function useTranslations() {
  const { translations, locale, available_locales } = usePage<PageProps>().props;

  const t = (key: string, replacements?: Record<string, string>): string => {
    const keys = key.split(".");
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value !== "string") {
      return key;
    }

    // Handle replacements like %{username}
    if (replacements) {
      return Object.entries(replacements).reduce(
        (str, [k, v]) => str.replace(new RegExp(`%{${k}}`, "g"), v),
        value
      );
    }

    return value;
  };

  return { t, locale, available_locales };
}
