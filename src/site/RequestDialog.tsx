import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import { trpc } from "@/providers/trpc";
import { useBlocks, type BlockItem } from "./useBlocks";
import { IconCheck, IconWhatsapp, IconX } from "./icons";

/** يُستخدم ريثما تصل قائمة المشكلات من لوحة التحكم. */
const TOPICS_FB: BlockItem[] = ["salary", "contract", "abuse", "eosb", "rights", "other"].map(
  (itemKey, i) => ({
    id: -(i + 1),
    section: "topic",
    itemKey,
    titleKey: `topic.${itemKey}`,
    descKey: `topic.${itemKey}.desc`,
    icon: "dots",
    tint: "brand",
    sortOrder: i,
    enabled: true,
  }),
);

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
  const [area, setArea] = useState("");
  const [topicSel, setTopicSel] = useState(topic);
  const [message, setMessage] = useState("");
  const [picked, setPicked] = useState<Record<number, string>>({});
  const [missing, setMissing] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const topics = useBlocks("topic", TOPICS_FB);

  // أسئلة نوع المشكلة المختار — تتبدّل كلما غيّر الزائر اختياره
  const questionsQuery = trpc.questions.byTopic.useQuery(
    { topic: topicSel },
    { enabled: open && !!topicSel, staleTime: 60_000 },
  );
  const questions = questionsQuery.data ?? [];

  useEffect(() => {
    if (open) {
      setTopicSel(topic);
      setDone(false);
    }
  }, [open, topic]);

  // تغيير نوع المشكلة يلغي إجابات الأسئلة السابقة لأنها تخص مشكلة أخرى
  useEffect(() => {
    setPicked({});
    setMissing([]);
  }, [topicSel]);

  const createReq = trpc.requests.create.useMutation({ onSuccess: () => setDone(true) });

  if (!open) return null;

  const inputCls =
    "w-full px-4 py-3.5 rounded-xl border-2 border-stone-200 bg-white text-lg focus:border-[#2fa3c4] focus:outline-none transition-colors";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const unanswered = questions.filter((q) => q.required && !picked[q.id]).map((q) => q.id);
    if (unanswered.length) {
      setMissing(unanswered);
      document.getElementById(`q-${unanswered[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // نحفظ نص السؤال والإجابة كما رآهما الزائر، فلا تتأثر الطلبات القديمة
    // إن عُدّلت الأسئلة لاحقًا من اللوحة.
    const answers = questions
      .filter((q) => picked[q.id])
      .map((q) => ({ q: t(q.labelKey), a: t(picked[q.id]) }));
    createReq.mutate({ name, phone, area, topic: topicSel, message, answers, lang });
  };

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

            <form className="space-y-5" onSubmit={submit}>
              <div>
                <label className="block font-bold text-[#22312c] mb-1.5">{t("request.topic")}</label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((b) => (
                    <button
                      type="button"
                      key={b.itemKey}
                      onClick={() => setTopicSel(b.itemKey)}
                      className={`px-4 py-2.5 rounded-full border-2 text-sm font-bold transition-colors ${
                        topicSel === b.itemKey
                          ? "border-[#2fa3c4] bg-[#2fa3c4]/10 text-[#17788f]"
                          : "border-stone-200 text-stone-500 hover:border-stone-300"
                      }`}
                    >
                      {t(b.titleKey)}
                    </button>
                  ))}
                </div>
              </div>

              {/* أسئلة الاستبيان الخاصة بنوع المشكلة — إجابة واحدة لكل سؤال */}
              {questions.length > 0 && (
                <div className="rounded-2xl bg-[#faf8f2] border border-[#e7e3d3] p-4 space-y-5">
                  <p className="font-black text-[#22312c]">{t("request.answersTitle")}</p>
                  {questions.map((q) => {
                    const isMissing = missing.includes(q.id);
                    return (
                      <div key={q.id} id={`q-${q.id}`}>
                        <label className="block font-bold text-[#22312c] mb-2">
                          {t(q.labelKey)}
                          {!q.required && (
                            <span className="text-stone-400 font-normal text-sm"> ({t("common.cancel")})</span>
                          )}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {q.options.map((o) => (
                            <button
                              type="button"
                              key={o.id}
                              onClick={() => {
                                setPicked({ ...picked, [q.id]: o.labelKey });
                                setMissing(missing.filter((m) => m !== q.id));
                              }}
                              className={`px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-colors min-h-[46px] ${
                                picked[q.id] === o.labelKey
                                  ? "border-[#2e9c6a] bg-[#5cb98b]/15 text-[#2e9c6a]"
                                  : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                              }`}
                            >
                              {t(o.labelKey)}
                            </button>
                          ))}
                        </div>
                        {isMissing && (
                          <p className="mt-1.5 text-sm font-bold text-rose-600">{t("request.required")}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div>
                <label className="block font-bold text-[#22312c] mb-1.5">{t("request.name")}</label>
                <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </div>

              <div>
                <label className="block font-bold text-[#22312c] mb-1.5">{t("request.phone")}</label>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                  inputMode="tel"
                  dir="ltr"
                />
                <p className="mt-1 text-sm text-stone-400">{t("request.phoneHint")}</p>
              </div>

              <div>
                <label className="block font-bold text-[#22312c] mb-1.5">{t("request.area")}</label>
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className={inputCls}
                  placeholder={t("request.areaHint")}
                />
              </div>

              <div>
                <label className="block font-bold text-[#22312c] mb-1.5">
                  {t("request.messageOptional")}
                </label>
                <textarea
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
