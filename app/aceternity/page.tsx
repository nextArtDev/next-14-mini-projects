import { GoogleGeminiEffectDemo } from './components/GoogleGeminiEffect/Demo'
import { TabsDemo } from './components/Tabs/Demo'
import { EvervaultCardDemo } from './components/evervault-card/Demo'
import { HeroParallaxDemo } from './components/hero-parallax/Demo'
import { SVGMaskEffectDemo } from './components/mask-svg/Demo'
import { TextRevealCardPreview } from './components/text-reveal/Demo'

function page() {
  return (
    <div>
      <GoogleGeminiEffectDemo />
      <EvervaultCardDemo />
      <TabsDemo />
      <HeroParallaxDemo />
      <SVGMaskEffectDemo />
      <TextRevealCardPreview />
    </div>
  )
}

export default page
