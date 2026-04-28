import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  getSetting, setSetting,
  getVaProjects, upsertVaProject, deleteVaProject,
  getTechProjects, upsertTechProject, deleteTechProject,
  getSimpleList, addSimpleListItem, updateSimpleListItem, deleteSimpleListItem,
  getAvailability, upsertAvailability, deleteAvailability,
  getContacts, upsertContact, deleteContact,
  uploadProjectImage, deleteProjectImage,
} from '../lib/api'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    summary: '',
    vaProjects: [],
    techProjects: [],
    vaSkills: [],
    techSkills: [],
    tools: [],
    strengths: [],
    availability: [],
    contacts: [],
  })
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // ── load all data ──
  const loadAll = useCallback(async () => {
    setLoading(true)
    try {
      const [
        summary, vaProjects, techProjects,
        vaSkills, techSkills, tools, strengths,
        availability, contacts,
      ] = await Promise.all([
        getSetting('summary'),
        getVaProjects(),
        getTechProjects(),
        getSimpleList('va_skills'),
        getSimpleList('tech_skills'),
        getSimpleList('tools'),
        getSimpleList('strengths'),
        getAvailability(),
        getContacts(),
      ])
      setData({ summary, vaProjects, techProjects, vaSkills, techSkills, tools, strengths, availability, contacts })
    } catch (err) {
      console.error('Failed to load portfolio data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  // ── summary ──
  const updateSummary = useCallback(async (value) => {
    await setSetting('summary', value)
    setData((p) => ({ ...p, summary: value }))
    showToast('Summary updated!')
  }, [showToast])

  // ── VA projects ──
  const saveVaProject = useCallback(async (project, imageFile) => {
    let image_url = project.image_url ?? null
    if (imageFile) {
      if (image_url) await deleteProjectImage(image_url)
      image_url = await uploadProjectImage(imageFile, 'va')
    }
    const saved = await upsertVaProject({ ...project, image_url })
    setData((p) => {
      const exists = p.vaProjects.find((x) => x.id === saved.id)
      return {
        ...p,
        vaProjects: exists
          ? p.vaProjects.map((x) => (x.id === saved.id ? saved : x))
          : [...p.vaProjects, saved],
      }
    })
    showToast('VA project saved!')
    return saved
  }, [showToast])

  const removeVaProject = useCallback(async (id, imageUrl) => {
    await deleteVaProject(id)
    if (imageUrl) await deleteProjectImage(imageUrl)
    setData((p) => ({ ...p, vaProjects: p.vaProjects.filter((x) => x.id !== id) }))
    showToast('VA project deleted!')
  }, [showToast])

  // ── Tech projects ──
  const saveTechProject = useCallback(async (project, iconFile) => {
    let icon_url = project.icon_url ?? null
    if (iconFile) {
      if (icon_url) await deleteProjectImage(icon_url)
      icon_url = await uploadProjectImage(iconFile, 'tech-icons')
    }
    const saved = await upsertTechProject({ ...project, icon_url })
    setData((p) => {
      const exists = p.techProjects.find((x) => x.id === saved.id)
      return {
        ...p,
        techProjects: exists
          ? p.techProjects.map((x) => (x.id === saved.id ? saved : x))
          : [...p.techProjects, saved],
      }
    })
    showToast('Tech project saved!')
    return saved
  }, [showToast])

  const removeTechProject = useCallback(async (id, iconUrl) => {
    await deleteTechProject(id)
    if (iconUrl) await deleteProjectImage(iconUrl)
    setData((p) => ({ ...p, techProjects: p.techProjects.filter((x) => x.id !== id) }))
    showToast('Tech project deleted!')
  }, [showToast])

  // ── simple lists ──
  const addToList = useCallback(async (field, category, value) => {
    const item = await addSimpleListItem(category, value)
    setData((p) => ({ ...p, [field]: [...p[field], item] }))
    showToast('Item added!')
  }, [showToast])

  const updateInList = useCallback(async (field, id, value) => {
    await updateSimpleListItem(id, value)
    setData((p) => ({
      ...p,
      [field]: p[field].map((x) => (x.id === id ? { ...x, value } : x)),
    }))
    showToast('Item updated!')
  }, [showToast])

  const removeFromList = useCallback(async (field, id) => {
    await deleteSimpleListItem(id)
    setData((p) => ({ ...p, [field]: p[field].filter((x) => x.id !== id) }))
    showToast('Item deleted!')
  }, [showToast])

  // ── availability ──
  const saveAvailability = useCallback(async (item) => {
    const saved = await upsertAvailability(item)
    setData((p) => {
      const exists = p.availability.find((x) => x.id === saved.id)
      return {
        ...p,
        availability: exists
          ? p.availability.map((x) => (x.id === saved.id ? saved : x))
          : [...p.availability, saved],
      }
    })
    showToast('Availability saved!')
  }, [showToast])

  const removeAvailability = useCallback(async (id) => {
    await deleteAvailability(id)
    setData((p) => ({ ...p, availability: p.availability.filter((x) => x.id !== id) }))
    showToast('Deleted!')
  }, [showToast])

  // ── contacts ──
  const saveContact = useCallback(async (item) => {
    const saved = await upsertContact(item)
    setData((p) => {
      const exists = p.contacts.find((x) => x.id === saved.id)
      return {
        ...p,
        contacts: exists
          ? p.contacts.map((x) => (x.id === saved.id ? saved : x))
          : [...p.contacts, saved],
      }
    })
    showToast('Contact saved!')
  }, [showToast])

  const removeContact = useCallback(async (id) => {
    await deleteContact(id)
    setData((p) => ({ ...p, contacts: p.contacts.filter((x) => x.id !== id) }))
    showToast('Deleted!')
  }, [showToast])

  return (
    <PortfolioContext.Provider
      value={{
        data, loading, toast, showToast,
        updateSummary,
        saveVaProject, removeVaProject,
        saveTechProject, removeTechProject,
        addToList, updateInList, removeFromList,
        saveAvailability, removeAvailability,
        saveContact, removeContact,
        reload: loadAll,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
