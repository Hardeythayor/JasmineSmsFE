import React from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../utils/i18n'

const languages = [
    {code: 'en', lang: 'English'},
    {code: 'kr', lang: 'Korean'}
]

const LanguageSelector = (lng) => {
    const {i18n} = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }
  return (
    <div className='d-flex gap-3'>
        {languages.map(lng => (
            <button key={lng.code} onClick={() => changeLanguage(lng.code)} className={`btn btn-sm ${lng.code === i18n.language ? 'btn-dark' : 'btn-outline-dark'}`}>
                {lng.lang}
            </button>
        ))

        }
    </div>
  )
}

export default LanguageSelector