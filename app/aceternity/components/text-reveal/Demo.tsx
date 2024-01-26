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
        <TextRevealCardTitle>
          Sometimes, you just need to see it.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          This is a text reveal card. Hover over the card to reveal the hidden
          text.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  )
}
