import { BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type FieldType =
  | 'text'
  | 'rich-text'
  | 'number'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'multi-select'
  | 'tags'
  | 'url'
  | 'email'

export interface EntityField {
  name: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  description?: string
  options?: string[]
  defaultValue?: string | number | boolean
  showInList?: boolean
  showInForm?: boolean
}

export interface EntityConfig {
  name: string
  pluralName: string
  slug: string
  icon: LucideIcon
  fields: EntityField[]
  titleField: string
  descriptionField?: string
  defaultSort: { field: string; direction: 'asc' | 'desc' }
  allowCreate: boolean
  allowEdit: boolean
  allowDelete: boolean
  allowExport: boolean
}

export const entityConfig: EntityConfig = {
  name: 'BuildJournalEntry',
  pluralName: 'BuildJournalEntries',
  slug: 'build_journal_entries',
  icon: BookOpen,

  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      placeholder: 'Generated post title',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'rich-text',
      required: true,
      placeholder: 'Generated build journal post content',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'generated_date',
      label: 'Generated Date',
      type: 'date',
      required: true,
      showInList: true,
      showInForm: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: ['draft', 'scheduled', 'published', 'archived'],
      defaultValue: 'draft',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'source_commits',
      label: 'Source Commits',
      type: 'tags',
      required: false,
      placeholder: 'Commits used for generation',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'social_media_platform',
      label: 'Social Media Platform',
      type: 'multi-select',
      required: false,
      options: ['X', 'LinkedIn', 'Bluesky', 'Dev.to'],
      showInList: false,
      showInForm: true,
    },
    {
      name: 'public_url',
      label: 'Public URL',
      type: 'url',
      required: false,
      placeholder: 'https://shiplog.dev/you/day-14',
      showInList: false,
      showInForm: true,
    }
  ],

  titleField: 'title',
  descriptionField: 'content',
  defaultSort: { field: 'generated_date', direction: 'desc' },

  allowCreate: true,
  allowEdit: true,
  allowDelete: true,
  allowExport: true,
}

export function getListFields(): EntityField[] {
  return entityConfig.fields.filter((f) => f.showInList !== false)
}

export function getFormFields(): EntityField[] {
  return entityConfig.fields.filter((f) => f.showInForm !== false)
}

export function fieldTypeToSql(type: FieldType): string {
  const mapping: Record<FieldType, string> = {
    text: 'TEXT',
    'rich-text': 'TEXT',
    number: 'INTEGER',
    currency: 'NUMERIC(10,2)',
    date: 'DATE',
    datetime: 'TIMESTAMPTZ',
    boolean: 'BOOLEAN DEFAULT FALSE',
    select: 'TEXT',
    'multi-select': 'TEXT[]',
    tags: 'TEXT[]',
    url: 'TEXT',
    email: 'TEXT',
  }
  return mapping[type] || 'TEXT'
}

export function fieldTypeToZod(field: EntityField): string {
  const base: Record<FieldType, string> = {
    text: 'z.string()',
    'rich-text': 'z.string()',
    number: 'z.coerce.number()',
    currency: 'z.coerce.number()',
    date: 'z.string()',
    datetime: 'z.string()',
    boolean: 'z.boolean()',
    select: `z.enum([${field.options?.map((o) => `'${o}'`).join(', ') || "'draft'"}])`,
    'multi-select': 'z.array(z.string())',
    tags: 'z.array(z.string())',
    url: 'z.string().url()',
    email: 'z.string().email()',
  }
  let schema = base[field.type] || 'z.string()'
  if (!field.required) {
    schema += '.optional()'
  }
  return schema
}
