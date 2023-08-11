import { useState, useEffect } from "react";
import { DEMANDE } from "@services";
import { useSelector } from "react-redux";
import { TableDemandes } from "@components";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useToast } from "@common";
import ValiderDemandesConges from "./ValiderDemandesConges";

export default () => {
	const user = useSelector(({ account }) => account.user);

	const [demandes, setDemandes] = useState([]);
	const [open, setOpen] = useState(false);
	const [currentConge, setCurrentConge] = useState(null);
	const [page, setPage] = useState(0);
	const [count, setCount] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [sort, setSort] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		fetchDemandes();
	}, [page, rowsPerPage, sort]);

	const fetchDemandes = () => {
		setIsLoading(true);
		DEMANDE.getTypeDemandeByCodeTypeDemande("DC").then((response) => {
			DEMANDE.getMyDemandes(
				user.id,
				response?.data?.id,
				rowsPerPage,
				page,
				sort,
			)
				.then((response) => {
					setIsLoading(false);
					setDemandes(response.data.content);
					setCount(response.data.totalElements);
					setPage(response?.data?.pageable?.pageNumber);
					setRowsPerPage(response?.data?.pageable?.pageSize);
				})
				.catch((e) => {
					console.log(e);
					setIsLoading(false);
				});
		});
	};

	const handleClickOpen = (conge) => {
		setOpen(true);
		setCurrentConge(conge);
	};

	const handleClose = () => {
		setOpen(false);
		setIsLoading(false);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleSortMethod = () => {
		setSort(!sort);
	};
	//Pour changer le format de la date de dd-MM-yyyy à yyyy-MM-dd
	function formatDateFunction(inputDate) {
		const [day, month, year] = inputDate.split("-");
		const formattedDate = `${year}-${month}-${day}`;
		return formattedDate;
	}

	const handleClickAnnuler = () => {
		setIsLoading(true);
		DEMANDE.annulerDemande(user.id, currentConge)
			.then((response) => {
				handleClose();
				if (response.status === 200) {
					fetchDemandes();
				}
			})
			.catch((e) => {
				handleClose();
			});
	};

	const hanldeClickModifier = (demande) => {
		const idDemandeParam = demande.idDemande;
		navigate(`/demandes/${encodeURIComponent(idDemandeParam)}`);
	};

	const handleClickEnvoyer = (demande) => {
		const modDemande = { ...demande };

		modDemande.dateDebut = formatDateFunction(modDemande.dateDebut);
		modDemande.dateReprise = formatDateFunction(modDemande.dateReprise);
		modDemande.dateDemande = formatDateFunction(modDemande.dateDemande);
		setIsLoading(true);
		DEMANDE.envoyerDemande(user.id, modDemande)
			.then((response) => {
				handleClose();
				if (response.status === 200) {
					fetchDemandes();
				} else {
					toast("error", response?.response?.data?.message);
				}
			})
			.catch((e) => {
				handleClose();
				toast("error", e?.message);
			});
	};
	const handleClickDemandeAnnulation = (demande) => {
		setIsLoading(true);
		DEMANDE.demandeAnnulationDemande(user.id, demande.idDemande)
			.then((response) => {
				handleClose(true);
				if (response.status == 200) {
					fetchDemandes();
					console.log(response.data);
				} else {
					toast("error", response?.response?.data?.message);
				}
			})

			.catch((e) => {
				handleClose();
				console.log(e);
				toast("error", e?.message);
			});
	};

	return (
		<>
			{isLoading && (
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={isLoading}
					onClick={handleClose}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
			<TableDemandes
				demandes={demandes}
				open={open}
				handleClickOpen={handleClickOpen}
				handleClickAnnuler={handleClickAnnuler}
				handleClose={handleClose}
				hanldeClickModifier={hanldeClickModifier}
				handleClickEnvoyer={handleClickEnvoyer}
				page={page}
				rowsPerPage={rowsPerPage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangePage={handleChangePage}
				count={count}
				usePagination
				handleSortMethod={handleSortMethod}
				sort={sort}
				handleClickDemandeAnnulation={handleClickDemandeAnnulation}
			></TableDemandes>
		</>
	);
};
