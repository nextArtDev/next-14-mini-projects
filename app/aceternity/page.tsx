import { AnimatedPinDemo } from './components/3d-pin/Demo'
import { GoogleGeminiEffectDemo } from './components/GoogleGeminiEffect/Demo'
import { TabsDemo } from './components/Tabs/Demo'
import { BentoGridDemo } from './components/bento-grid/Demo'
import { EvervaultCardDemo } from './components/evervault-card/Demo'
import { HeroParallaxDemo } from './components/hero-parallax/Demo'
import { LayoutGridDemo } from './components/layout-grid/Demo'
import { SVGMaskEffectDemo } from './components/mask-svg/Demo'
import { TextRevealCardPreview } from './components/text-reveal/Demo'

function page() {
  return (
    <div>
      <LayoutGridDemo />
      <BentoGridDemo />
      <GoogleGeminiEffectDemo />
      <EvervaultCardDemo />
      <TabsDemo />
      <HeroParallaxDemo />
      <SVGMaskEffectDemo />
      <AnimatedPinDemo />
      <TextRevealCardPreview />
    </div>
  )
}

export default page
