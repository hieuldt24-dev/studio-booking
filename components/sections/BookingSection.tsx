"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Check, Calendar, Clock, DollarSign, Camera, Info, X, Sparkles, CheckCircle2 } from "lucide-react";
import { landingPagesDb } from "@/lib/content";
import { formatPrice } from "@/lib/formatPrice";
import { useLanguage } from "@/components/layout/LanguageContext";

export function BookingSection() {
  const { language, t } = useLanguage();
  const studios = landingPagesDb.root[language].studios.rooms;
  const equipmentList = useMemo(() => landingPagesDb.root[language].equipment || [], [language]);

  // Form states
  const [selectedStudio, setSelectedStudio] = useState<string>("studio-a");
  const [rentalDate, setRentalDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("08:00");
  const [endTime, setEndTime] = useState<string>("12:00");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientMessage, setClientMessage] = useState<string>("");

  // Equipment selection state: { [id]: { selected: boolean, quantity: number } }
  const [selectedEquipment, setSelectedEquipment] = useState<
    Record<string, { selected: boolean; quantity: number }>
  >({});

  // Submission / Modal states
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Initialize equipment states
  useEffect(() => {
    const initial: Record<string, { selected: boolean; quantity: number }> = {};
    // Use VI equipment keys to keep initialization stable
    landingPagesDb.root.vi.equipment?.forEach((item) => {
      initial[item.id] = { selected: false, quantity: 1 };
    });
    setSelectedEquipment(initial);

    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setRentalDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Listen to URL query parameters on mount to pre-select studio or equipment
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      // Handle studio parameter (e.g. ?studio=studio-a)
      const studioParam = params.get("studio");
      if (studioParam) {
        const validIds = landingPagesDb.root.vi.studios.rooms.map((s) => s.id);
        if (validIds.includes(studioParam)) {
          setSelectedStudio(studioParam);
        } else if (studioParam === "none") {
          setSelectedStudio("none");
        }
      }

      // Handle equipment parameter (e.g. ?equipment=sony-fx3)
      const eqParam = params.get("equipment");
      const hasEq = landingPagesDb.root.vi.equipment?.some((item) => item.id === eqParam);
      if (eqParam && hasEq) {
        setSelectedEquipment((prev) => ({
          ...prev,
          [eqParam]: {
            selected: true,
            quantity: 1,
          },
        }));
      }
    }
  }, []);

  // Calculate rental duration in hours
  const getDurationHours = () => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const diff = (endH * 60 + endM) - (startH * 60 + startM);
    return diff > 0 ? diff / 60 : 0;
  };

  const durationHours = getDurationHours();

  // Selected Studio details
  const currentStudioData = studios.find((s) => s.id === selectedStudio);
  const studioHourlyRate = currentStudioData?.pricePerHour || 0;
  const studioCost = studioHourlyRate * durationHours;

  // Equipment Cost calculation
  const getEquipmentCost = () => {
    let sum = 0;
    equipmentList.forEach((item) => {
      const state = selectedEquipment[item.id];
      if (state?.selected) {
        sum += item.pricePerSession * state.quantity;
      }
    });
    return sum;
  };

  const equipmentCost = getEquipmentCost();
  const calculatedTotal = studioCost + equipmentCost;
  const calculatedDeposit = Math.round(calculatedTotal * 0.5);

  const toggleEquipment = (id: string) => {
    setSelectedEquipment((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selected: !prev[id]?.selected,
      },
    }));
  };

  const updateEquipmentQty = (id: string, qty: number) => {
    if (qty < 1) return;
    setSelectedEquipment((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: qty,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate mock booking ID
    const randomId = "LUM-" + Math.floor(10000 + Math.random() * 90000);
    setBookingId(randomId);
    setTotalCost(calculatedTotal);
    setDepositAmount(calculatedDeposit);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setClientMessage("");

    // Reset selected equipment
    const resetEq: Record<string, { selected: boolean; quantity: number }> = {};
    equipmentList.forEach((item) => {
      resetEq[item.id] = { selected: false, quantity: 1 };
    });
    setSelectedEquipment(resetEq);
    setSelectedStudio("studio-a");
  };

  return (
    <section
      className="py-section-gap px-5 md:px-margin-desktop max-w-container-max mx-auto border-t border-neutral-200"
      id="booking"
    >
      <div className="grid grid-cols-12 gap-8 lg:gap-gutter">
        {/* Left: Input Form */}
        <div className="col-span-12 lg:col-span-7">
          <div className="mb-10">
            <span className="font-sans text-[9px] sm:text-[10px] font-extrabold tracking-[0.25em] text-indigo-600 uppercase mb-2 block">
              {t("booking_tagline")}
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-[64px] font-extrabold tracking-[-0.05em] uppercase text-primary leading-[0.95] mb-4">
              {t("booking_title")}
            </h2>
            <p className="font-sans text-sm text-secondary leading-relaxed max-w-lg">
              {t("booking_subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Step 1: Space & Time */}
            <div className="space-y-6">
              <h3 className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-neutral-100 pb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white font-sans text-[10px]">1</span>
                {t("booking_step1")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Studio Selection */}
                <div>
                  <label htmlFor="booking-studio" className="font-sans text-[9px] uppercase tracking-[0.22em] text-secondary font-bold mb-2 block">
                    {t("booking_form_studio")}
                  </label>
                  <select
                    id="booking-studio"
                    value={selectedStudio}
                    onChange={(e) => setSelectedStudio(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-300 focus:border-primary p-3 font-sans text-sm text-primary focus:ring-0 focus:outline-none transition-colors"
                  >
                    {studios.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} ({formatPrice(room.pricePerHour)}/hr)
                      </option>
                    ))}
                    <option value="none">{t("booking_form_no_studio")}</option>
                  </select>
                </div>

                {/* Date Selection */}
                <div>
                  <label htmlFor="booking-date" className="font-sans text-[9px] uppercase tracking-[0.22em] text-secondary font-bold mb-2 block">
                    {t("booking_form_date")}
                  </label>
                  <div className="relative">
                    <input
                      id="booking-date"
                      required
                      type="date"
                      value={rentalDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setRentalDate(e.target.value)}
                      className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-300 focus:border-primary p-3 font-sans text-sm text-primary focus:ring-0 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Start Time */}
                <div>
                  <label htmlFor="booking-start" className="font-sans text-[9px] uppercase tracking-[0.22em] text-secondary font-bold mb-2 block">
                    {t("booking_form_start_time")}
                  </label>
                  <input
                    id="booking-start"
                    required
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-300 focus:border-primary p-3 font-sans text-sm text-primary focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label htmlFor="booking-end" className="font-sans text-[9px] uppercase tracking-[0.22em] text-secondary font-bold mb-2 block">
                    {t("booking_form_end_time")}
                  </label>
                  <input
                    id="booking-end"
                    required
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-300 focus:border-primary p-3 font-sans text-sm text-primary focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {durationHours <= 0 && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs border border-red-200">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>{t("booking_error_time")}</span>
                </div>
              )}
            </div>

            {/* Step 2: Equipment Rental */}
            <div className="space-y-6">
              <h3 className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-neutral-100 pb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white font-sans text-[10px]">2</span>
                {t("booking_step2")}
              </h3>

              <p className="font-sans text-xs text-secondary mb-4 leading-relaxed">
                {t("booking_addons_desc")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {equipmentList.map((item) => {
                  const state = selectedEquipment[item.id] || { selected: false, quantity: 1 };
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleEquipment(item.id)}
                      className={`p-4 border transition-all duration-300 cursor-pointer flex items-center justify-between ${state.selected
                          ? "border-black bg-neutral-50 shadow-sm"
                          : "border-neutral-200 hover:border-neutral-400 bg-white"
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 ${state.selected ? "border-black bg-black text-white" : "border-neutral-300"
                            }`}
                        >
                          {state.selected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading text-[13px] font-bold tracking-tight text-primary normal-case truncate">
                            {item.name}
                          </p>
                          <p className="font-sans text-[9px] font-semibold tracking-wide text-secondary mt-0.5">
                            {formatPrice(item.pricePerSession)}
                          </p>
                        </div>
                      </div>

                      {state.selected && (
                        <div
                          className="flex items-center gap-1 bg-white border border-neutral-200 rounded p-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => updateEquipmentQty(item.id, state.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-xs hover:bg-neutral-100 font-bold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-sans font-bold">
                            {state.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateEquipmentQty(item.id, state.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-xs hover:bg-neutral-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Customer Details */}
            <div className="space-y-6">
              <h3 className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-neutral-100 pb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white font-sans text-[10px]">3</span>
                {t("booking_step3")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="booking-name" className="font-sans text-[9px] uppercase tracking-[0.22em] text-secondary font-bold mb-2 block">
                    {t("booking_form_name")} <span className="text-indigo-600">*</span>
                  </label>
                  <input
                    id="booking-name"
                    required
                    type="text"
                    placeholder={t("booking_form_name_placeholder")}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-300 focus:border-primary p-3 font-sans text-sm text-primary focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="booking-phone" className="font-sans text-[9px] uppercase tracking-[0.22em] text-secondary font-bold mb-2 block">
                    {t("booking_form_phone")} <span className="text-indigo-600">*</span>
                  </label>
                  <input
                    id="booking-phone"
                    required
                    type="tel"
                    placeholder={t("booking_form_phone_placeholder")}
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-300 focus:border-primary p-3 font-sans text-sm text-primary focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="booking-email" className="font-sans text-[9px] uppercase tracking-[0.22em] text-secondary font-bold mb-2 block">
                    {t("booking_form_email")} <span className="text-indigo-600">*</span>
                  </label>
                  <input
                    id="booking-email"
                    required
                    type="email"
                    placeholder={t("booking_form_email_placeholder")}
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-300 focus:border-primary p-3 font-sans text-sm text-primary focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>

                {/* Special Message */}
                <div className="md:col-span-2">
                  <label htmlFor="booking-msg" className="font-sans text-[9px] uppercase tracking-[0.22em] text-secondary font-bold mb-2 block">
                    {t("booking_form_notes")}
                  </label>
                  <textarea
                    id="booking-msg"
                    rows={3}
                    placeholder={t("booking_form_notes_placeholder")}
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-300 focus:border-primary p-3 font-sans text-sm text-primary focus:ring-0 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={durationHours <= 0 && selectedStudio !== "none"}
              className="cta-sweep group relative inline-flex items-center justify-center bg-black text-white px-12 py-5 font-sans text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:text-white active:scale-[0.98] disabled:bg-neutral-300 disabled:cursor-not-allowed w-full md:w-auto cursor-pointer"
            >
              <span className="relative z-10">{t("booking_btn_submit")}</span>
            </button>
          </form>
        </div>

        {/* Right: Sticky Invoice Summary */}
        <div className="col-span-12 lg:col-span-5">
          <div className="border border-black bg-white p-6 md:p-8 sticky top-32 space-y-6 shadow-sm">
            <h3 className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-neutral-100 pb-3">
              {t("booking_summary_title")}
            </h3>

            {/* Studio Line Item */}
            {selectedStudio !== "none" && currentStudioData ? (
              <div className="space-y-2 pb-4 border-b border-neutral-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-heading text-xs font-extrabold uppercase text-primary">
                      {currentStudioData.name}
                    </h4>
                    <p className="font-sans text-xs text-secondary mt-1">
                      {formatPrice(studioHourlyRate)} / hour &times; {durationHours.toFixed(1)} hrs
                    </p>
                  </div>
                  <span className="font-sans text-sm font-extrabold text-primary">
                    {formatPrice(studioCost)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-secondary font-sans">
                  {rentalDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      {new Date(rentalDate).toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    {startTime} - {endTime}
                  </span>
                </div>
              </div>
            ) : (
              <div className="pb-4 border-b border-neutral-100">
                <h4 className="font-heading text-xs font-extrabold uppercase text-secondary">
                  {t("booking_no_studio_selected")}
                </h4>
                <p className="font-sans text-xs text-secondary mt-1">
                  {t("booking_no_studio_desc")}
                </p>
              </div>
            )}

            {/* Equipment Line Items */}
            <div className="space-y-4 pb-4 border-b border-neutral-100">
              <h4 className="font-sans text-[10px] font-extrabold uppercase text-primary tracking-[0.15em]">
                {t("booking_summary_addons_price")}
              </h4>

              {equipmentList.filter(item => selectedEquipment[item.id]?.selected).length === 0 ? (
                <p className="font-sans text-xs text-secondary italic">{t("booking_no_equipment")}</p>
              ) : (
                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                  {equipmentList
                    .filter((item) => selectedEquipment[item.id]?.selected)
                    .map((item) => {
                      const qty = selectedEquipment[item.id]?.quantity || 1;
                      return (
                        <div key={item.id} className="flex justify-between items-center text-xs">
                          <div>
                            <p className="font-heading text-[13px] font-bold tracking-tight text-neutral-800 normal-case">
                              {item.name}
                            </p>
                            <p className="font-sans text-secondary mt-0.5">
                              {formatPrice(item.pricePerSession)} &times; {qty}
                            </p>
                          </div>
                          <span className="font-sans font-extrabold text-primary">
                            {formatPrice(item.pricePerSession * qty)}
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Billing Invoice Breakdown */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-sans text-[10px] text-secondary uppercase tracking-[0.15em] font-semibold">{t("booking_summary_subtotal")}</span>
                <span className="font-sans font-extrabold text-primary">{formatPrice(calculatedTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-sans text-[10px] text-secondary uppercase tracking-[0.15em] font-semibold">{t("booking_summary_taxes")}</span>
                <span className="font-sans font-extrabold text-primary">{t("booking_summary_included")}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans text-secondary border-t border-neutral-100 pt-3">
                <span className="uppercase tracking-[0.15em] font-extrabold text-[10px]">{t("booking_summary_total")}</span>
                <span className="font-extrabold text-base text-primary">{formatPrice(calculatedTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans bg-indigo-50 border border-indigo-100 p-3 mt-4">
                <div className="flex flex-col">
                  <span className="font-extrabold text-[10px] text-indigo-900 uppercase tracking-[0.15em]">{t("booking_summary_deposit")}</span>
                  <span className="text-[10px] text-indigo-700 leading-tight">{t("booking_summary_deposit_desc")}</span>
                </div>
                <span className="font-extrabold text-xl text-indigo-600">{formatPrice(calculatedDeposit)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Success Modal with dynamic VietQR code */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-neutral-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up flex flex-col">

            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <span className="font-heading text-lg font-bold uppercase tracking-wider">
                  {t("booking_success_title")}
                </span>
              </div>
              <button
                onClick={resetForm}
                className="p-1 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-secondary" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Left Column: Booking Details */}
              <div className="space-y-6">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-secondary">
                    {t("booking_success_ref")}
                  </span>
                  <h4 className="font-heading text-2xl font-extrabold text-primary">
                    {bookingId}
                  </h4>
                </div>

                <div className="space-y-4">
                  <h5 className="font-heading text-xs font-bold uppercase tracking-wider text-indigo-600">
                    {t("booking_success_summary")}
                  </h5>
                  <div className="space-y-2 text-xs font-sans text-secondary">
                    {selectedStudio !== "none" && currentStudioData && (
                      <div className="flex justify-between border-b border-neutral-50 pb-1.5">
                        <span className="uppercase">{currentStudioData.name}</span>
                        <span className="font-semibold text-primary">{formatPrice(studioCost)}</span>
                      </div>
                    )}
                    {equipmentList.some(item => selectedEquipment[item.id]?.selected) && (
                      <div className="flex justify-between border-b border-neutral-50 pb-1.5">
                        <span className="uppercase">{t("booking_summary_addons_price")}</span>
                        <span className="font-semibold text-primary">{formatPrice(equipmentCost)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-1 font-bold text-primary">
                      <span>{t("booking_summary_total")}</span>
                      <span>{formatPrice(totalCost)}</span>
                    </div>
                    <div className="flex justify-between text-indigo-600 font-bold bg-indigo-50/50 p-2 border border-indigo-100 mt-2">
                      <span>{t("booking_summary_deposit")}</span>
                      <span>{formatPrice(depositAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 font-sans text-xs text-secondary bg-neutral-50 p-4 border border-neutral-100">
                  <p className="font-semibold text-primary">{t("booking_success_next_title")}</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>{t("booking_success_next_step1", { email: clientEmail })}</li>
                    <li>{t("booking_success_next_step2")}</li>
                    <li>{t("booking_success_next_step3")}</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: VietQR Code Box */}
              <div className="flex flex-col items-center justify-center p-6 border border-neutral-200 bg-neutral-50/50 rounded-xl space-y-4">
                <div className="text-center">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-secondary">
                    {t("booking_qr_secure")}
                  </span>
                  <p className="font-sans text-[11px] text-neutral-500 mt-1">
                    {t("booking_qr_scan")}
                  </p>
                </div>

                {/* Simulated dynamic QR Code */}
                <div className="relative w-48 h-48 bg-white border border-neutral-200 p-2 shadow-inner flex items-center justify-center group overflow-hidden">
                  <Image
                    src={`https://api.vietqr.io/image/970422-190820268888-r2P8p8b.jpg?accountName=DUO%20TECH%20STUDIO&amount=${depositAmount}&addInfo=DEPOSIT%20LUMINA%20${bookingId}`}
                    alt="VietQR code for booking deposit"
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-2 p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-6 h-6 text-indigo-600 animate-bounce" />
                    <p className="font-sans text-[10px] text-primary leading-tight font-semibold">
                      {t("booking_qr_hover", { amount: formatPrice(depositAmount) })}
                    </p>
                  </div>
                </div>

                <div className="text-center font-sans text-xs">
                  <p className="font-bold text-neutral-800">{t("booking_bank_name")}</p>
                  <p className="text-secondary mt-0.5">{t("booking_bank_account")} <span className="font-mono text-primary font-semibold">190820268888</span></p>
                  <p className="text-secondary">{t("booking_bank_holder")} <span className="font-semibold text-primary uppercase">DUO TECH STUDIO</span></p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3">
              <button
                onClick={resetForm}
                className="px-6 py-3 border border-neutral-300 hover:border-black font-sans text-xs font-bold uppercase tracking-wider bg-white transition-colors cursor-pointer"
              >
                {t("booking_success_close")}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
