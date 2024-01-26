'use client'
import React from 'react'
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from './TextRevealCard'

export function TextRevealCardPreview() {
  return (
    <div
      dir="rtl"
      className="flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full"
    >
      <TextRevealCard
        text="کتابی برای تمام فصول"
        revealText="کتابی برای خواندن"
      >
        <TextRevealCardTitle>کتاب زمان</TextRevealCardTitle>
        <TextRevealCardDescription>
          نویسنده و مترجم: کتاب روز
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  )
}
