import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import { trpc } from "@/providers/trpc";
import { IconCheck, IconWhatsapp, IconX } from "./icons";

const TOPIC_KEYS = ["salary", "contract", "abuse", "eosb", "rights", "other"];

export function RequestDialog({
  open,
  topic,
  whatsapp,
  onClose,
}: {
  open: boolean;
  topic: string;
  whatsapp: string;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topicSel, setTopicSel] = useState(topic);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setTopicSel(topic);
      setDone(false);
    }
  }, [open, topic]);

  const createReq = trpc.requests.create.useMutation({
    onSuccess: () => setDone(true),
  });

  if (!open) return null;

  const inputCls =
    "w-full px-4 py-3.5 rounded-xl border-2 border-stone-200 bg-white text-lg focus:border-[#2fa3c4] focus:outline-none transition-colors";

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg bg-white squircle sm:m-4 p-6 sm:p-7 shadow-lift anim-rise max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full text-stone-400 hover:bg-stone-100"
          aria-label="close"
        >
          <IconX size={22} />
        </button>

        {done ? (
          <div className="text-center py-8">
            <span className="mx-auto mb-5 w-20 h-20 rounded-full bg-[#2e9c6a]/10 text-[#2e9c6a] grid place-items-center">
              <IconCheck size={42} />
            </span>
            <p className="text-xl font-bold text-[#22312c] leading-relaxed mb-6">{t("request.success")}</p>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#22b358] text-white font-bold"
            >
              <IconWhatsapp size={22} />
              {t("hero.ctaWhatsapp")}
            </a>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-display text-[#22312c] mb-1">{t("request.title")}</h2>
            <p className="text-stone-400 mb-6">{t("request.subtitle")}</p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                createReq.mutate({ name, phone, topic: topicSel, message, lang });
              }}
            >
              <div>
                <label className="block font-bold text-[#22312c] mb-1.5">{t("request.topic")}</label>
                <div className="flex flex-wrap gap-2">
                  {TOPIC_KEYS.map((k) => (
                    <button
                      type="button"
                      key={k}
                      onClick={() => setTopicSel(k)}
                      className={`px-4 py-2.5 rounded-full border-2 text-sm font-bold transition-colors ${
                        topicSel === k
                          ? "border-[#2fa3c4] bg-[#2fa3c4]/10 text-[#17788f]"
                          : "border-stone-200 text-stone-500 hover:border-stone-300"
                      }`}
                    >
                      {t(`topic.${k}`)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-bold text-[#22312c] mb-1.5">{t("request.name")}</label>
                <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block font-bold text-[#22312c] mb-1.5">{t("request.phone")}</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                  inputMode="tel"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block font-bold text-[#22312c] mb-1.5">{t("request.message")}</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className={inputCls}
                />
              </div>
              <button
                type="submit"
                disabled={createReq.isPending}
                className="w-full py-4 rounded-2xl bg-grad-brand-deep text-white text-lg font-bold shadow-lift hover:opacity-95 active:scale-[0.99] transition disabled:opacity-60 min-h-[58px]"
              >
                {createReq.isPending ? "…" : t("request.submit")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
