import { supabase } from './supabase'

// ── helpers ──────────────────────────────────────────────────
const throwOnError = ({ data, error }) => {
  if (error) throw error
  return data
}

// ── settings ─────────────────────────────────────────────────
export async function getSetting(key) {
  const rows = await throwOnError(
    await supabase.from('portfolio_settings').select('value').eq('key', key).single()
  )
  return rows?.value ?? ''
}

export async function setSetting(key, value) {
  return throwOnError(
    await supabase
      .from('portfolio_settings')
      .upsert({ key, value }, { onConflict: 'key' })
  )
}

// ── va_projects ──────────────────────────────────────────────
export async function getVaProjects() {
  return throwOnError(
    await supabase.from('va_projects').select('*').order('sort_order')
  )
}
export async function upsertVaProject(project) {
  return throwOnError(
    await supabase.from('va_projects').upsert(project).select().single()
  )
}
export async function deleteVaProject(id) {
  return throwOnError(
    await supabase.from('va_projects').delete().eq('id', id)
  )
}

// ── tech_projects ─────────────────────────────────────────────
export async function getTechProjects() {
  return throwOnError(
    await supabase.from('tech_projects').select('*').order('sort_order')
  )
}
export async function upsertTechProject(project) {
  return throwOnError(
    await supabase.from('tech_projects').upsert(project).select().single()
  )
}
export async function deleteTechProject(id) {
  return throwOnError(
    await supabase.from('tech_projects').delete().eq('id', id)
  )
}

// ── simple_lists ──────────────────────────────────────────────
export async function getSimpleList(category) {
  const rows = await throwOnError(
    await supabase
      .from('simple_lists')
      .select('id, value')
      .eq('category', category)
      .order('sort_order')
  )
  return rows ?? []
}
export async function addSimpleListItem(category, value) {
  const existing = await getSimpleList(category)
  return throwOnError(
    await supabase
      .from('simple_lists')
      .insert({ category, value, sort_order: existing.length + 1 })
      .select()
      .single()
  )
}
export async function updateSimpleListItem(id, value) {
  return throwOnError(
    await supabase.from('simple_lists').update({ value }).eq('id', id)
  )
}
export async function deleteSimpleListItem(id) {
  return throwOnError(
    await supabase.from('simple_lists').delete().eq('id', id)
  )
}

// ── availability ──────────────────────────────────────────────
export async function getAvailability() {
  return throwOnError(
    await supabase.from('availability').select('*').order('sort_order')
  )
}
export async function upsertAvailability(item) {
  return throwOnError(
    await supabase.from('availability').upsert(item).select().single()
  )
}
export async function deleteAvailability(id) {
  return throwOnError(
    await supabase.from('availability').delete().eq('id', id)
  )
}

// ── contacts ──────────────────────────────────────────────────
export async function getContacts() {
  return throwOnError(
    await supabase.from('contacts').select('*').order('sort_order')
  )
}
export async function upsertContact(item) {
  return throwOnError(
    await supabase.from('contacts').upsert(item).select().single()
  )
}
export async function deleteContact(id) {
  return throwOnError(
    await supabase.from('contacts').delete().eq('id', id)
  )
}

// ── storage / image upload ────────────────────────────────────
export async function uploadProjectImage(file, folder = 'va') {
  const ext = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from('project-images')
    .upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from('project-images').getPublicUrl(path)
  return data.publicUrl
}
export async function deleteProjectImage(url) {
  if (!url) return
  const path = url.split('/project-images/')[1]
  if (!path) return
  await supabase.storage.from('project-images').remove([path])
}

// ── resume upload ─────────────────────────────────────────────
export async function uploadResume(file) {
  // Always use fixed filename so uploads replace the previous file
  const ext = file.name.split('.').pop()
  const path = `resume.${ext}`
  const { error } = await supabase.storage
    .from('resumes')
    .upload(path, file, { upsert: true, contentType: 'application/pdf' })
  if (error) throw error
  const { data } = supabase.storage.from('resumes').getPublicUrl(path)
  return data.publicUrl
}
export async function deleteResume() {
  // Try both pdf and doc variants
  await supabase.storage.from('resumes').remove(['resume.pdf', 'resume.doc', 'resume.docx'])
}

// ── auth ──────────────────────────────────────────────────────
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}