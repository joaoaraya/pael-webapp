'use client'

import React from 'react'
import OpenModal from '@/components/button/OpenModal'
import ModalFiltros from '@/components/modal/ModalFiltros'
import Icon from '@/components/icon/Icon'

import './style.scss'

type SearchProps = {
    showFilterButton?: boolean;
    placeholderText?: string;
}

export default function Search({ showFilterButton = false, placeholderText = 'Search' }: SearchProps) {

	return (
		<div className="sessionSearch">
			<div className="searchInput">
				<Icon nome="search" />

				<input
					className="searchBar"
					type="search"
					placeholder={placeholderText}
				/>
			</div>

			{showFilterButton && (
				<OpenModal
					tagType="button"
					className="btnSecondary btnFiltro"
					modalTitle="Filtros"
					modalContent={<ModalFiltros />}
				>
					<Icon nome="options" /><p>Filtros</p>
				</OpenModal>
			)}
		</div >
	)
}