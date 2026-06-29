import { useEffect, useState } from "react";
import { Container } from "@mui/material";

import Header from "../components/Header";
import DashboardAnalytics from "../components/DashboardAnalytics";
import DashboardCharts from "../components/DashboardCharts";
import ProductForm from "../components/ProductForm";
import ResultCard from "../components/ResultCard";
import InvestigationTable from "../components/InvestigationTable";
import InvestigationFilters from "../components/InvestigationFilters";

import api from "../services/api";

export default function DashboardPage() {

    const [result, setResult] = useState(null);
    const [investigations, setInvestigations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const [violation, setViolation] = useState("all");

    const [category, setCategory] = useState("all");

    const [sort, setSort] = useState("newest");

    const loadInvestigations = async () => {

        try {

            const response = await api.get("/investigations");

            setInvestigations(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    const filteredInvestigations = investigations
        .filter((item) => {

            if (
                search &&
                !item.title.toLowerCase().includes(search.toLowerCase())
            )
                return false;

            if (
                violation === "yes" &&
                !item.violation
            )
                return false;

            if (
                violation === "no" &&
                item.violation
            )
                return false;

            if (
                category !== "all" &&
                item.risk_category !== category
            )
                return false;

            return true;
        })
        .sort((a, b) => {

            if (sort === "newest")
                return b.id - a.id;

            if (sort === "oldest")
                return a.id - b.id;

            if (sort === "highrisk")
                return b.risk_score - a.risk_score;

            return 0;
        });

    useEffect(() => {

        loadInvestigations();

    }, []);

    return (

        <>

            <Header />

            <Container maxWidth="lg">

                <DashboardAnalytics
                    investigations={investigations}
                />

                <DashboardCharts
                    investigations={investigations}
                />

                <ProductForm
                    loading={loading}
                    setLoading={setLoading}
                    onResult={(data) => {
                        setResult(data);
                        loadInvestigations();
                    }}
                />

                <ResultCard
                    result={result}
                />

                <InvestigationFilters
                    investigations={investigations}
                    search={search}
                    setSearch={setSearch}
                    violation={violation}
                    setViolation={setViolation}
                    category={category}
                    setCategory={setCategory}
                    sort={sort}
                    setSort={setSort}
                    resetFilters={() => {
                        setSearch("");
                        setViolation("all");
                        setCategory("all");
                        setSort("newest");
                    }}
                />

                <InvestigationTable
                    investigations={filteredInvestigations}
                />

            </Container>

        </>

    );

}