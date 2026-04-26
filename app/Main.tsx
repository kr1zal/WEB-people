'use client'

import Link from '@/components/Link'
import { motion, useReducedMotion } from 'framer-motion'

const PHOTO_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/static/images/oksana.jpg`
import { useState, useLayoutEffect, useCallback, useRef } from 'react'
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  ScrollActiveCard,
} from '@/components/Motion'
import TypingEffect from '@/components/TypingEffect'

// --- Impact numbers ---
const impactNumbers = [
  { num: '15+', label: 'лет в финансах' },
  { num: '10+', label: 'лет управленческого опыта' },
  { num: '5+ млрд ₽', label: 'годовой оборот холдинга' },
  { num: '6', label: 'компаний под управлением' },
]

// --- Hero position ---
const heroPosition = {
  period: '2020 — н.в.',
  duration: '5+ лет',
  role: 'Финансовый директор Холдинга',
  company: 'ГК ООО «Империал»',
  desc: 'Финансовое управление мебельным производством и продажами в каналах B2B, B2C и на маркетплейсах. Построение финансовой структуры Холдинга, юнит-экономики, системы бюджетирования. В периметре управления: 3 производственных компании, 2 услуговых, Торговый дом из 45 магазинов.',
  stats: [
    { num: '5+ млрд ₽', label: 'Оборот' },
    { num: '6', label: 'Компаний' },
    { num: '45', label: 'Магазинов' },
    { num: 'B2B · B2C · MP', label: 'Каналы продаж' },
  ],
}

// --- Secondary positions ---
const positions = [
  {
    period: '2017 — 2020',
    duration: '3 года',
    role: 'Финансовый директор',
    company: 'ГК ООО «Интер Групп»',
    oneLiner:
      'Кондитерское производство и дистрибьюция чая, кофе и кондитерских изделий.',
    metricNum: '3',
    metricLabel: 'Направления',
    extraMetrics: [
      { num: 'FMCG', label: 'Сегмент' },
      { num: 'B2B', label: 'Модель' },
    ],
  },
  {
    period: '2010 — 2016',
    duration: '6+ лет',
    role: 'Финансист → CFO',
    company: 'ГК ООО «Бест-Трейд»',
    oneLiner:
      'Дистрибьюция алкогольной продукции и безалкогольных напитков. Путь от экономиста до финансового руководителя.',
    metricNum: '6+ лет',
    metricLabel: 'Рост до CFO',
    extraMetrics: [
      { num: 'FMCG', label: 'Сегмент' },
      { num: 'Алкоголь', label: 'Ниша' },
    ],
  },
]

// --- Companies (detailed cards) ---
const companies = [
  {
    badge: 'Текущая компания',
    period: '2020 — н.в.',
    title: 'ГК ООО «Империал»',
    role: 'Финансовый директор Холдинга',
    desc: 'Мебельное производство и продажа мебельной продукции в каналах B2B, B2C и на маркетплейсах. Годовой оборот холдинга превышает 5 млрд ₽. Финансовое управление 3 производственными компаниями, 2 услуговыми, Торговым домом из 45 магазинов и онлайн-каналами. Построение финансовой структуры, юнит-экономики, системы бюджетирования и KPI, работа с кредитными организациями и фондами развития промышленности.',
    tags: ['Мебель', 'Производство', 'B2B · B2C', 'Маркетплейсы', 'Холдинг'],
  },
  {
    badge: '2017 — 2020',
    period: '3 года',
    title: 'ГК ООО «Интер Групп»',
    role: 'Финансовый директор',
    desc: 'Кондитерское производство и дистрибьюция чая, кофе и кондитерских изделий. Финансовое управление полным циклом — от закупок сырья до отгрузки готовой продукции. Бюджетирование, контроль себестоимости, управленческий учёт, работа с разными системами налогообложения.',
    tags: ['FMCG', 'Кондитерка', 'Дистрибьюция', 'Производство'],
  },
  {
    badge: '2010 — 2016',
    period: '6+ лет',
    title: 'ГК ООО «Бест-Трейд»',
    role: 'Экономист → Финансовый директор',
    desc: 'Дистрибьюторская компания алкогольной продукции и безалкогольных напитков. Путь от экономиста до финансового руководителя: постановка управленческого учёта, бюджетирование, финансовый анализ, работа с банками и поставщиками. Фундамент 15+ летнего опыта в финансах FMCG-сегмента.',
    tags: ['FMCG', 'Алкоголь', 'Напитки', 'Дистрибьюция'],
  },
]

// --- Competencies (4-column lists) ---
const competencies = [
  {
    title: 'Стратегия и структура',
    items: [
      'Разработка и внедрение финансовой структуры',
      'Построение юнит-экономики',
      'Учётная политика управленческого учёта',
      'Формы финансовой отчётности под задачи бизнеса',
      'Управление структурой капитала',
    ],
  },
  {
    title: 'Планирование и бюджет',
    items: [
      'Долгосрочное и краткосрочное планирование',
      'Разработка и внедрение системы бюджетирования',
      'KPI и системы мотивации сотрудников',
      'Базовая модель ценообразования',
      'Расчёт принципов формирования себестоимости',
    ],
  },
  {
    title: 'Анализ и отчётность',
    items: [
      'Анализ финансово-хозяйственной деятельности',
      'Расчёт ключевых финансовых показателей',
      'Выявление причин отклонений',
      'Предложение мероприятий по оптимизации',
      'Ежемесячная защита отчётности перед собственником',
    ],
  },
  {
    title: 'Финансирование и налоги',
    items: [
      'Работа с банками и кредитными организациями',
      'Оборотные и инвестиционные кредиты',
      'Поддержка экспорта и импорта',
      'Фонды развития промышленности',
      'Налоговое планирование',
      'Работа с разными системами налогообложения',
    ],
  },
]

// --- Education ---
const education = [
  {
    year: '2026',
    place: 'МИРБИС',
    title: 'MBA, специализация «Финансы»',
  },
  {
    year: '2025',
    place: 'Usenkov.PRO',
    title: 'Контроллинг — бизнес глазами собственника (Мюнхенская школа контроллинга)',
  },
  {
    year: '2024',
    place: 'МИРБИС',
    title: 'Финансист-лидер изменений',
  },
  {
    year: '2023',
    place: 'Eduson Academy',
    title: 'Финансовый директор',
  },
  {
    year: '2021',
    place: 'МГУТУ им. К.Г. Разумовского',
    title: 'Главный бухгалтер коммерческой организации',
  },
  {
    year: '2016',
    place: 'НОУ ВПО «Институт экономики»',
    title: 'Бакалавриат «Экономика фирмы»',
  },
]

// --- Typing roles ---
const typingRoles = [
  'Финансовый директор',
  'CFO',
  'Юнит-экономика',
  'Бюджетирование',
  'Финансы FMCG',
]

export default function Main() {
  const [openPosition, setOpenPosition] = useState<'hero' | number | null>(null)
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const prefersReducedMotion = useReducedMotion()
  const pendingCenter = useRef<string | null>(null)

  const togglePosition = useCallback((key: 'hero' | number) => {
    setOpenPosition((prev) => {
      const willOpen = prev !== key
      pendingCenter.current = willOpen ? String(key) : null
      return willOpen ? key : null
    })
  }, [])

  useLayoutEffect(() => {
    const key = pendingCenter.current
    if (!key) return
    pendingCenter.current = null
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(max-width: 767px)').matches) return
    const el = cardRefs.current[key]
    if (!el) return
    el.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [openPosition])

  const heroFade = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
        }

  const photoReveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.97, filter: 'blur(6px)' },
        animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        transition: { duration: 1, delay: 0, ease: [0.25, 0.1, 0.25, 1] as const },
      }

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative right-1/2 left-1/2 -mx-[50vw] min-h-[calc(100svh-64px)] w-screen overflow-hidden 2xl:min-h-[850px]">
        <motion.div
          {...photoReveal}
          className="absolute top-0 right-0 hidden h-full w-[50%] overflow-hidden md:block lg:w-[55%] 2xl:right-[calc((100vw-1600px)/2)] 2xl:w-[900px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTO_SRC}
            alt="Дегтярева Оксана Владимировна"
            width={960}
            height={1280}
            className="h-full w-full object-cover object-top saturate-[0.9]"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_right,#e2e7dd_0%,transparent_40%)]" />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_top,#e2e7dd_0%,#e2e7dd_8%,transparent_35%)]" />
        </motion.div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-64px)] w-full max-w-[1380px] flex-col justify-start px-6 pt-[72px] sm:px-12 sm:pt-[100px] lg:pt-[140px] 2xl:min-h-[850px] 2xl:max-w-[1600px]">
          <motion.div {...photoReveal} className="mb-8 md:hidden">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTO_SRC}
                alt="Дегтярева Оксана Владимировна"
                width={680}
                height={907}
                className="h-full w-full object-cover object-top saturate-[0.9]"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#e2e7dd] to-transparent" />
            </div>
          </motion.div>

          <motion.h1
            {...heroFade(0.15)}
            className="font-display max-w-[520px] text-5xl leading-[1.05] tracking-tight text-[#1e2420] sm:text-6xl lg:text-[clamp(48px,5vw,72px)] xl:text-[clamp(56px,6vw,80px)]"
          >
            Оксана
            <br />
            Дегтярева
          </motion.h1>

          <motion.div
            {...heroFade(0.35)}
            className="mt-5 h-7 text-lg font-medium text-[#7a1f2e]"
          >
            <TypingEffect words={typingRoles} />
          </motion.div>

          <motion.p
            {...heroFade(0.45)}
            className="mt-6 max-w-[500px] text-base leading-7 text-gray-600"
          >
            <strong className="font-semibold text-[#1e2420]">
              15+ лет в финансах, 10+ лет управленческого опыта.
            </strong>{' '}
            Финансовый директор Холдинга. Строю финансовые структуры, юнит-экономику и системы
            бюджетирования в компаниях с оборотом 5+ млрд ₽.
          </motion.p>

          <motion.div {...heroFade(0.6)} className="mt-8 flex gap-3">
            <Link
              href="#companies"
              className="rounded-lg bg-[#1e2420] px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-px hover:shadow-md"
            >
              Компании
            </Link>
            <Link
              href="#experience"
              className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:-translate-y-px hover:border-gray-400"
            >
              Опыт
            </Link>
          </motion.div>

          <motion.div {...heroFade(0.8)} className="mt-auto pt-10 pb-8 lg:pt-16 lg:pb-12">
            <div className="max-w-[560px] border-l-[3px] border-[#7a1f2e] pl-5">
              <p className="font-display text-lg leading-[1.5] font-normal text-[#1e2420] italic">
                Финансы — язык бизнеса. Задача финдиректора — говорить на нём без акцента.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experience" className="scroll-mt-20 py-10 sm:py-16 2xl:pt-24">
        <Reveal>
          <div className="mb-10 flex items-baseline justify-between border-b-[3px] border-[#1e2420] pb-3 sm:mb-12">
            <h2 className="font-display text-3xl tracking-tight text-[#1e2420] sm:text-4xl">
              Опыт
            </h2>
            <span className="text-xs font-medium tracking-widest text-gray-500 uppercase 2xl:text-[13px]">
              Карьерный путь
            </span>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-10 grid grid-cols-2 gap-y-5 border-b border-gray-200 pb-7 sm:mb-12 sm:flex sm:gap-0 sm:pb-7 2xl:pb-9">
            {impactNumbers.map((item, i) => (
              <div
                key={item.label}
                className={`${i % 2 === 1 ? 'border-l border-gray-200 pl-5' : 'pr-5'} sm:flex-1 ${i > 0 ? 'sm:border-l sm:border-gray-200 sm:pl-6' : ''} sm:pr-6 ${i === impactNumbers.length - 1 ? '2xl:flex 2xl:flex-col 2xl:items-center 2xl:text-center' : ''}`}
              >
                <div className="font-display text-3xl text-[#7a1f2e] sm:text-4xl lg:text-5xl">
                  {item.num}
                </div>
                <div className="mt-1.5 text-xs text-gray-600 sm:text-[13px] 2xl:mt-2 2xl:text-[14px]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Desktop: Hero + Rows ── */}
        <div className="hidden md:block">
          <Reveal>
            <div className="grid grid-cols-[1fr_280px] gap-8 border-b border-gray-200 pb-10 lg:grid-cols-[1fr_340px] lg:gap-12 2xl:grid-cols-[1fr_400px] 2xl:gap-16 2xl:pb-14">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.15em] text-gray-500 uppercase 2xl:text-[12px] 2xl:tracking-[0.12em]">
                  {heroPosition.period} · {heroPosition.duration}
                </div>
                <h3 className="font-display mt-3 text-[32px] leading-[1.2] text-[#1e2420] 2xl:mt-4 2xl:text-[38px]">
                  {heroPosition.role}
                </h3>
                <div className="mt-1.5 text-base font-medium text-[#7a1f2e] 2xl:mt-2 2xl:text-lg">
                  {heroPosition.company}
                </div>
                <p className="mt-4 max-w-[580px] text-base leading-[1.7] text-gray-700 2xl:mt-5 2xl:max-w-[640px] 2xl:text-[17px]">
                  {heroPosition.desc}
                </p>
              </div>
              <div className="flex flex-col border-l border-gray-200 pl-12">
                {heroPosition.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline justify-between gap-4 border-b border-gray-200 py-4 last:border-b-0"
                  >
                    <span className="font-display text-[22px] text-[#7a1f2e]">
                      {stat.num}
                    </span>
                    <span className="text-xs text-gray-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {positions.map((pos, i) => (
              <Reveal key={pos.period} delay={i * 0.08}>
                <div className="group grid grid-cols-[180px_1fr_auto] items-baseline gap-6 border-b border-gray-200 py-6 transition-all duration-200 hover:pl-2 2xl:grid-cols-[160px_1fr_auto] 2xl:gap-10 2xl:py-8">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.08em] text-gray-500 uppercase 2xl:text-[13px] 2xl:tracking-[0.1em]">
                      {pos.period}
                    </div>
                    <div className="mt-0.5 text-[11px] text-gray-400 opacity-80 2xl:mt-1 2xl:text-xs">
                      {pos.duration}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl text-[#1e2420] transition-colors duration-200 group-hover:text-[#7a1f2e] 2xl:text-2xl">
                      {pos.role}
                    </h3>
                    <div className="mt-0.5 text-[13px] font-medium text-[#7a1f2e] 2xl:mt-1 2xl:text-[15px]">
                      {pos.company}
                    </div>
                    <p className="mt-2 text-[14px] leading-[1.6] text-gray-600 2xl:mt-2.5 2xl:max-w-[640px] 2xl:text-[15px] 2xl:leading-[1.65]">
                      {pos.oneLiner}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-[22px] text-[#7a1f2e] 2xl:text-[28px]">
                      {pos.metricNum}
                    </div>
                    <div className="mt-1.5 text-[11px] font-semibold tracking-[0.08em] text-gray-500 uppercase 2xl:mt-1.5 2xl:text-[12px] 2xl:tracking-[0.1em]">
                      {pos.metricLabel}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Mobile: Vertical Timeline ── */}
        <div className="relative flex flex-col gap-2 pl-7 md:hidden">
          <div className="absolute top-2 bottom-2 left-[5px] w-[1.5px] bg-gray-300" />

          <div className="relative scroll-mt-4">
            <div
              className={`absolute top-1/2 -left-7 z-[2] h-3 w-3 -translate-y-1/2 rounded-full transition-colors duration-300 ${openPosition === 'hero' ? 'bg-[#7a1f2e] shadow-[0_0_0_3px_rgba(122,31,46,0.12)]' : 'border-2 border-[#e2e7dd] bg-gray-300 shadow-[0_0_0_3px_rgba(0,0,0,0.04)]'}`}
            />
            <button
              ref={(el) => {
                cardRefs.current.hero = el
              }}
              type="button"
              aria-expanded={openPosition === 'hero'}
              className={`w-full cursor-pointer overflow-hidden rounded border-l-[3px] bg-[#edf0e8] text-left shadow-sm transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#7a1f2e]/40 focus-visible:outline-none ${openPosition === 'hero' ? 'border-[#7a1f2e]' : 'border-transparent'}`}
              onClick={() => togglePosition('hero')}
            >
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold tracking-[0.12em] text-gray-400 uppercase">
                    {heroPosition.period} · {heroPosition.duration}
                  </div>
                  <div className="font-display mt-1 text-xl leading-tight text-[#1e2420]">
                    {heroPosition.role}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-[#7a1f2e]">
                    {heroPosition.company}
                  </div>
                </div>
                <motion.svg
                  animate={{ rotate: openPosition === 'hero' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-5 w-5 shrink-0 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </div>
              {openPosition === 'hero' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-t border-gray-200 px-4 pt-3 pb-4">
                    <p className="text-[13px] leading-relaxed text-gray-500">
                      {heroPosition.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-gray-200 pt-3">
                      {heroPosition.stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col">
                          <span className="font-display text-lg text-[#7a1f2e]">
                            {stat.num}
                          </span>
                          <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </button>
          </div>

          {positions.map((pos, i) => (
            <div key={pos.period} className="relative scroll-mt-4">
              <div
                className={`absolute top-1/2 -left-7 z-[2] h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#e2e7dd] transition-colors duration-300 ${openPosition === i ? 'bg-[#7a1f2e]' : 'bg-gray-300'}`}
              />
              <button
                ref={(el) => {
                  cardRefs.current[String(i)] = el
                }}
                type="button"
                aria-expanded={openPosition === i}
                className={`w-full cursor-pointer overflow-hidden rounded border-l-[3px] bg-[#edf0e8] text-left shadow-sm transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#7a1f2e]/40 focus-visible:outline-none ${openPosition === i ? 'border-[#7a1f2e]' : 'border-transparent'}`}
                onClick={() => togglePosition(i)}
              >
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold tracking-[0.12em] text-gray-400 uppercase">
                      {pos.period} · {pos.duration}
                    </div>
                    <div className="font-display mt-0.5 text-[17px] leading-tight text-[#1e2420]">
                      {pos.role}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-[#7a1f2e]">
                      {pos.company}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-[18px] text-[#7a1f2e]">
                      {pos.metricNum}
                    </div>
                    <div className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">
                      {pos.metricLabel}
                    </div>
                  </div>
                  <motion.svg
                    animate={{ rotate: openPosition === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-5 w-5 shrink-0 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </div>
                {openPosition === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-gray-200 px-4 pt-3 pb-4">
                      <p className="text-[13px] leading-relaxed text-gray-500">
                        {pos.oneLiner}
                      </p>
                      {pos.extraMetrics.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-gray-200 pt-3">
                          {pos.extraMetrics.map((m) => (
                            <div key={m.label} className="flex flex-col">
                              <span className="font-display text-lg text-[#7a1f2e]">
                                {m.num}
                              </span>
                              <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ COMPANIES ═══ */}
      <section id="companies" className="scroll-mt-20 py-10 sm:py-16">
        <Reveal>
          <div className="mb-12 flex items-baseline justify-between border-b-[3px] border-[#1e2420] pb-3">
            <h2 className="font-display text-3xl tracking-tight text-[#1e2420] sm:text-4xl">
              Компании
            </h2>
            <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
              Работа в холдингах
            </span>
          </div>
        </Reveal>

        {companies.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <ScrollActiveCard className="group relative mb-4 overflow-hidden border border-gray-200 bg-[#edf0e8] p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#7a1f2e] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-10 [&.in-view]:border-[#7a1f2e] [&.in-view]:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <div className="absolute top-0 left-0 h-0 w-1 bg-[#7a1f2e] transition-all duration-500 ease-out group-hover:h-full group-[.in-view]:h-full" />
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-block border border-[#7a1f2e] px-2.5 py-0.5 text-[11px] font-semibold tracking-widest text-[#7a1f2e] uppercase">
                  {c.badge}
                </span>
                <span className="text-[11px] font-semibold tracking-[0.12em] text-gray-400 uppercase">
                  {c.period}
                </span>
              </div>
              <h3 className="font-display mt-4 text-2xl text-[#1e2420] sm:text-3xl">
                {c.title}
              </h3>
              <div className="mt-1 text-xs font-semibold tracking-[.12em] text-[#7a1f2e] uppercase">
                {c.role}
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 font-light text-gray-500">
                {c.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((tag, ti) => (
                  <span
                    key={`${c.title}-${ti}`}
                    className="border border-gray-300 px-3 py-1 text-[11px] font-medium tracking-wider text-gray-500 uppercase transition-all duration-300 group-hover:border-[#7a1f2e]/50 group-hover:text-[#7a1f2e] group-[.in-view]:border-[#7a1f2e]/50 group-[.in-view]:text-[#7a1f2e]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollActiveCard>
          </Reveal>
        ))}
      </section>

      {/* ═══ COMPETENCIES ═══ */}
      <section id="competencies" className="scroll-mt-20 py-10 sm:py-16">
        <Reveal>
          <div className="mb-12 flex items-baseline justify-between border-b-[3px] border-[#1e2420] pb-3">
            <h2 className="font-display text-3xl tracking-tight text-[#1e2420] sm:text-4xl">
              Компетенции
            </h2>
            <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
              Области экспертизы
            </span>
          </div>
        </Reveal>

        <div className="border-t border-gray-200 pt-10">
          <StaggerContainer className="grid grid-cols-2 xl:grid-cols-4" stagger={0.1}>
            {competencies.map((col, i) => (
              <StaggerItem
                key={col.title}
                className={`border-gray-200 px-5 py-8 sm:px-6 xl:px-8 ${
                  i % 2 === 0 ? 'border-r' : ''
                } ${i < 2 ? 'border-b xl:border-b-0' : ''} ${
                  i < 3 ? 'xl:border-r' : 'xl:border-r-0'
                }`}
              >
                <h3 className="group/title font-display relative inline-block text-lg text-[#1e2420]">
                  {col.title}
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#7a1f2e] transition-all duration-300 group-hover/title:w-full" />
                </h3>
                <ul className="mt-5 flex flex-col gap-0">
                  {col.items.map((item, ii) => (
                    <li
                      key={`${col.title}-${ii}`}
                      className="group/item flex items-start gap-2.5 py-2 transition-all duration-200 hover:pl-1"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300 transition-colors duration-200 group-hover/item:bg-[#7a1f2e]" />
                      <span className="text-sm leading-relaxed text-gray-600 transition-colors duration-200 group-hover/item:text-[#1e2420]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ EDUCATION ═══ */}
      <section id="education" className="scroll-mt-20 py-10 sm:py-16">
        <Reveal>
          <div className="mb-12 flex items-baseline justify-between border-b-[3px] border-[#1e2420] pb-3">
            <h2 className="font-display text-3xl tracking-tight text-[#1e2420] sm:text-4xl">
              Образование
            </h2>
            <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
              Курсы и квалификация
            </span>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {education.map((edu, i) => (
            <Reveal key={`${edu.year}-${edu.place}`} delay={i * 0.06}>
              <div className="group grid grid-cols-[80px_1fr] items-baseline gap-5 border-b border-gray-200 py-5 transition-all duration-200 hover:pl-2 sm:grid-cols-[120px_1fr] sm:gap-8 sm:py-6">
                <div className="font-display text-2xl text-[#7a1f2e] sm:text-3xl">
                  {edu.year}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold tracking-[0.12em] text-gray-400 uppercase">
                    {edu.place}
                  </div>
                  <h3 className="font-display mt-1 text-lg leading-snug text-[#1e2420] transition-colors duration-200 group-hover:text-[#7a1f2e] sm:text-xl">
                    {edu.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
