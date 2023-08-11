import TableValidationConges from "@components/Table/TableValidationConges";
import { useState, useEffect } from "react";
import { DEMANDE } from "@services";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useToast } from "@common";

function ValiderDemandesConges() {
	const user = useSelector(({ account }) => account.user);

	const [demandes, setDemandes] = useState([]);
	const [open, setOpen] = useState(false);
	const [currentConge, setCurrentConge] = useState(null);
	const [page, setPage] = useState(0);
	const [count, setCount] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [sort, setSort] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [action, setAction] = useState("");
	const toast = useToast();
	useEffect(() => {
		fetchDemandes();
	}, [page, rowsPerPage, sort]);

	const fetchDemandes = () => {
		setIsLoading(true);
		DEMANDE.getTypeDemandeByCodeTypeDemande("DC").then((response) => {
			DEMANDE.getDemandesByCodeSup(
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
					setIsLoading(false);
					console.log(e);
				});
		});
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

	const handleClickOpenValider = (demande) => {
		setOpen(true);
		setCurrentConge(demande);
		setAction("valider");
	};

	const handleClickOpenRefuser = (demande) => {
		setOpen(true);
		setCurrentConge(demande);
		setAction("refuser");
	};

	const handleClickOpenAccepter = (demande) => {
		setOpen(true);
		setCurrentConge(demande);
		setAction("accepter");
	};

	const handleClickOpenRejeter = (demande) => {
		setOpen(true);
		setCurrentConge(demande);
		setAction("rejeter");
	};

	const handleClickValider = () => {
		handleClose();
		setIsLoading(true);
		DEMANDE.decisionDemande(user.id, currentConge?.idDemande, "validé")
			.then((response) => {
				handleClose();
				if (response.status === 200) {
					toast("success", "La validation est faite avec succée");
					fetchDemandes();
				} else {
					toast("error", response?.response?.data?.message);
				}
			})
			.catch((e) => {
				handleClose();
			});
	};
	const handleClickRefuser = () => {
		handleClose();
		setIsLoading(true);
		DEMANDE.decisionDemande(user.id, currentConge?.idDemande, "refusé")
			.then((response) => {
				handleClose();
				if (response.status === 200) {
					toast("success", "Le refus est fait avec succée");
					fetchDemandes();
				}
				toast("error", response?.response?.data?.message);
			})
			.catch((e) => {
				handleClose();
			});
	};
	const handleClickAccepter = () => {
		handleClose();
		setIsLoading(true);
		DEMANDE.decisionDemande(user.id, currentConge?.idDemande, "accepté")
			.then((response) => {
				handleClose();
				if (response.status === 200) {
					toast("success", response.data.message);
					fetchDemandes();
				}
				toast("error", response?.response?.data?.message);
			})
			.catch((e) => {
				handleClose();
			});
	};
	const handleClickRejeter = () => {
		handleClose();
		setIsLoading(true);
		DEMANDE.decisionDemande(user.id, currentConge?.idDemande, "rejeté")
			.then((response) => {
				handleClose();
				if (response.status === 200) {
					toast("success", response.data.message);
					fetchDemandes();
				}
				toast("error", response?.response?.data?.message);
			})
			.catch((e) => {
				handleClose();
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
			<TableValidationConges
				demandes={demandes}
				open={open}
				handleClickOpenValider={handleClickOpenValider}
				handleClickOpenRefuser={handleClickOpenRefuser}
				handleClickValider={handleClickValider}
				handleClickRefuser={handleClickRefuser}
				handleClose={handleClose}
				page={page}
				rowsPerPage={rowsPerPage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangePage={handleChangePage}
				count={count}
				usePagination
				handleSortMethod={handleSortMethod}
				sort={sort}
				action={action}
				handleClickOpenAccepter={handleClickOpenAccepter}
				handleClickOpenRejeter={handleClickOpenRejeter}
				handleClickAccepter={handleClickAccepter}
				handleClickRejeter={handleClickRejeter}
			></TableValidationConges>
		</>
	);
}

export default ValiderDemandesConges;
