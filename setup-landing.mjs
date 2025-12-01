#!/usr/bin/env node
import * as prismic from '@prismicio/client'

const repositoryName = 'p2backpack'
const endpoint = prismic.getRepositoryEndpoint(repositoryName)

console.log('🚀 Setting up Landing page in Prismic...')
console.log('=' .repeat(60))

// Instructions for manual setup
console.log('\n📝 MANUAL SETUP REQUIRED:\n')
console.log('The Landing custom type needs to be pushed via Slice Machine UI.')
console.log('\n✨ Steps to complete setup:\n')
console.log('1. Open Slice Machine UI: http://localhost:9999')
console.log('   → You should see "Landing" in the Custom Types list')
console.log('   → Click the green "Push to Prismic" button')
console.log('   → Confirm the push\n')
console.log('2. Create Landing document in Prismic:')
console.log('   → Visit: https://p2backpack.prismic.io')
console.log('   → Click "Create" → "Landing"')
console.log('   → Add the LandingHero slice')
console.log('   → Fill in content and publish\n')
console.log('3. Add Landing to Navigation:')
console.log('   → Open the "Navigation" document')
console.log('   → Click "Add item" in Links')
console.log('   → Label: "Landing"')
console.log('   → Link: Select "Landing" document')
console.log('   → Save and publish\n')
console.log('=' .repeat(60))

// Let's verify if we can at least see the custom types
console.log('\n🔍 Current Prismic setup:\n')

const client = prismic.createClient(endpoint)

try {
  const navigation = await client.getSingle('navigation')
  console.log('✅ Navigation has', navigation.data.links?.length || 0, 'links:')
  navigation.data.links?.forEach((link, i) => {
    const label = link.label?.[0]?.text || 'No label'
    console.log(`   ${i + 1}. ${label}`)
  })
} catch (error) {
  console.log('❌ Could not fetch navigation')
}

try {
  const landing = await client.getSingle('landing')
  console.log('\n✅ Landing document already exists!')
} catch (error) {
  console.log('\n⚠️  Landing document does not exist yet')
  console.log('   You need to create it in Prismic CMS after pushing the custom type')
}

console.log('\n💡 Once you complete these steps, restart your dev server:')
console.log('   npm run dev\n')
