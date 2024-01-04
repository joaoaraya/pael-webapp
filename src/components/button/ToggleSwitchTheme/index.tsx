'use client'
import { ChangeEvent } from 'react'
import { useRecoilState } from 'recoil'
import { AppGlobalState } from '@/utils/data/app.state'
import { Theme } from '@/utils/types/generic'
import Icon from '@/components/icon/Icon'

import './style.scss'

export default function ToggleSwitchTheme() {
	const [themeState, setThemeState] = useRecoilState(AppGlobalState.ThemeState)
	const defaultValueForCheckbox = themeState === 'Escuro'

	const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
		/*
            @   melhorar isso aqui depois, 
            @   o operador ternário em isDark e os
            @   Ifs estão fazendo a mesma coisa
        */
		const isDark: Theme = e.target.checked ? 'Escuro' : 'Claro'
		setThemeState(isDark)
		const html = document.getElementById('root-app')
		if (html) {
			if (e.target.checked) {
				html.classList.add('temaEscuro')
			} else {
				html.classList.remove('temaEscuro')
			}
		}
	}

	return (
		<div className="ToggleSwitchTheme">
			<p>{themeState}</p>

			<label className="toggleSwitch">
				<input
					type="checkbox"
					checked={defaultValueForCheckbox}
					onChange={handleToggle}
					className="checkbox"
				/>

				<span className="slider">
					<span id="iconSun">
						<Icon nome="sun" />
					</span>
					<span id="iconMoon">
						<Icon nome="moon" />
					</span>
				</span>
			</label>
		</div>
	)
}