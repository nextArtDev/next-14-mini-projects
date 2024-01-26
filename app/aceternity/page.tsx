import { GoogleGeminiEffectDemo } from './components/GoogleGeminiEffect/Demo'
import { TabsDemo } from './components/Tabs/Demo'
import { EvervaultCardDemo } from './components/evervault-card/Demo'
import { TextRevealCardPreview } from './components/text-reveal/Demo'

function page() {
  return (
    <div>
      <GoogleGeminiEffectDemo />
      <EvervaultCardDemo />
      <TabsDemo />
      <TextRevealCardPreview />
    </div>
  )
}

export default page
