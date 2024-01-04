import MainHeader from '@/components/session/MainHeader'
import Search from '@/components/session/Search'
import ListGruposPessoas from '@/components/session/ListGruposPessoas'

export default function PageComissoes() {
	return (
		<>
			<MainHeader titulo="Comissões">
				<button className="btnPrimary btnFloat">
					<p>Nova Comissão</p>
				</button>
			</MainHeader>

			<Search placeholderText="Procure por comissões..." showFilterButton={false} />

			<ListGruposPessoas />
		</>
	)
}
