#!/usr/bin/env node
import * as prismic from '@prismicio/client'

const repositoryName = 'p2backpack'
const endpoint = prismic.getRepositoryEndpoint(repositoryName)
const client = prismic.createClient(endpoint)

console.log('🔍 Checking Prismic repository:', repositoryName)
console.log('=' .repeat(60))

try {
  // Check for Navigation document
  console.log('\n📋 Navigation Document:')
  try {
    const navigation = await client.getSingle('navigation')
    console.log('✅ Navigation document exists')
    console.log('   Links in navigation:', navigation.data.links?.length || 0)
    if (navigation.data.links && navigation.data.links.length > 0) {
      navigation.data.links.forEach((link, index) => {
        const label = link.label?.[0]?.text || 'No label'
        const linkType = link.link?.link_type || 'unknown'
        const linkTarget = link.link?.type || link.link?.url || 'unknown'
        console.log(`   ${index + 1}. "${label}" → ${linkType} (${linkTarget})`)
      })
    } else {
      console.log('   ⚠️  No links configured in navigation')
    }
  } catch (error) {
    console.log('❌ Navigation document not found')
  }

  // Check for Landing document
  console.log('\n🚀 Landing Document:')
  try {
    const landing = await client.getSingle('landing')
    console.log('✅ Landing document exists')
    console.log('   ID:', landing.id)
    console.log('   Type:', landing.type)
    console.log('   Slices:', landing.data.slices?.length || 0)
  } catch (error) {
    console.log('❌ Landing document not found')
    console.log('   You need to create a Landing document in Prismic CMS')
  }

  // Check for About document
  console.log('\n📄 About Document:')
  try {
    const about = await client.getSingle('about')
    console.log('✅ About document exists')
    console.log('   ID:', about.id)
    console.log('   Slices:', about.data.slices?.length || 0)
  } catch (error) {
    console.log('❌ About document not found')
  }

  // List all custom types
  console.log('\n📚 All Documents in Repository:')
  const allDocs = await client.dangerouslyGetAll()
  const typeCount = {}
  allDocs.forEach(doc => {
    typeCount[doc.type] = (typeCount[doc.type] || 0) + 1
  })
  Object.entries(typeCount).forEach(([type, count]) => {
    console.log(`   ${type}: ${count} document(s)`)
  })

} catch (error) {
  console.error('❌ Error:', error.message)
}

console.log('\n' + '='.repeat(60))
console.log('💡 Next steps:')
console.log('   1. If Landing document doesn\'t exist: Create it in Prismic CMS')
console.log('   2. If Navigation has no links: Add Landing to Navigation in Prismic CMS')
console.log('   3. Visit: https://p2backpack.prismic.io')
