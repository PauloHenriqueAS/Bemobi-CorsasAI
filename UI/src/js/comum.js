var riscoClientMesChart;
var riscoContratoMesChart;
var riscoContratoMesMoneyChart;
var riscoClientesMesMoneyChart;

const URL_API_BASE = "http://127.0.0.1:8000"
function jsLoading(isOpen) {
    if (isOpen) {
        $('#loaderDiv').removeClass('d-none');
        $('#loaderDiv').fadeIn();
    } else {
        $('#loaderDiv').addClass('d-none');
        $('#loaderDiv').fadeOut();
    }
}

$(document).ready(function () {
    getBasicInfoDash();
    getDataDashClienteMes();
    getDataDashContratosMes();
    getDataDashEvasaoCliente();
    getDataDashEvasaoContrato();
    getDataDashClientesMesMoney();
    getDataDashContratosMesMoney();
});

async function getBasicInfoDash() {
    try {
        jsLoading(true);
        const apiUrl = `${URL_API_BASE}/dash/GetBasicInfoDash`;
        const res = await fetch(apiUrl);
        if (res.ok) {
            const returnApi = await res.json();
            jsLoading(false);
            setDataBaseDashboard(returnApi)
        } else {
            jsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao buscar informações para dashboard.',
                allowOutsideClick: false,
            });
        }
    } catch (error) {
        jsLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Erro ao buscar informações na API!`,
            allowOutsideClick: false,
        });
    }
}

function setDataBaseDashboard(dataFromApi) {
    $('#valAbertoDash').text(formatarDinheiro(dataFromApi.total_aberto));
    $('#valRecebidoDash').text(formatarDinheiro(dataFromApi.total_recebido));
    $('#numClientessAtivoDash').text(dataFromApi.clientes_ativos);
    $('#numContratosAtivoDash').text(dataFromApi.contratos_ativos);

    if (dataFromApi.sentimento_geral <= 107) {
        $('#txtSentimento').text('RUIM');
        $('#txtSentimento').addClass('text-danger');
        $('#imgSentimento').removeClass().addClass('far fa-frown').css('margin-left', '10px');
    }
    else if (dataFromApi.sentimento_geral > 108 && dataFromApi.sentimento_geral <= 214) {
        $('#txtSentimento').text('MEDIANO');
        $('#txtSentimento').addClass('text-warning');
        $('#imgSentimento').removeClass().addClass('far fa-meh').css('margin-left', '10px');
    }
    else {
        $('#txtSentimento').text('BOM');
        $('#txtSentimento').addClass('text-success');
        $('#imgSentimento').removeClass().addClass('far fa-smile').css('margin-left', '10px');
    }
}

function formatarDinheiro(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function getDataDashClienteMes() {
    try {
        jsLoading(true);
        const apiUrl = `${URL_API_BASE}/dash/GetDashRiskClientMonth`;
        const res = await fetch(apiUrl);
        if (res.ok) {
            const returnApi = await res.json();
            jsLoading(false);
            criarDashClienteMes(returnApi)
        } else {
            jsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao buscar informações para dashboard de cliente por mês.',
                allowOutsideClick: false,
            });
        }
    } catch (error) {
        jsLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Erro ao buscar informações na API!`,
            allowOutsideClick: false,
        });
    }
}

function criarDashClienteMes(dataFromApi) {
    if (!dataFromApi || !Array.isArray(dataFromApi)) {
        console.error('Dados inválidos recebidos para criar o gráfico:', dataFromApi);
        return;
    }

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
    var qtdeBaixo = dataFromApi.map(item => item.qtde_baixo);
    var qtdeMedio = dataFromApi.map(item => item.qtde_medio);
    var qtdeAlto = dataFromApi.map(item => item.qtde_alto);

    var ctx = document.getElementById('riscoClientMesChart').getContext('2d');
    var riscoClientMesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Baixo',
                    data: qtdeBaixo,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Médio',
                    data: qtdeMedio,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Alto',
                    data: qtdeAlto,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}


async function getDataDashContratosMes() {
    try {
        jsLoading(true);
        const apiUrl = `${URL_API_BASE}/dash/GetDashRiskContractMonth`;
        const res = await fetch(apiUrl);
        if (res.ok) {
            const returnApi = await res.json();
            jsLoading(false);
            criarDashContratosMes(returnApi)
        } else {
            jsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao buscar informações para dashboard de contratos por mês.',
                allowOutsideClick: false,
            });
        }
    } catch (error) {
        jsLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Erro ao buscar informações na API!`,
            allowOutsideClick: false,
        });
    }
}

function criarDashContratosMes(dataFromApi) {
    if (!dataFromApi || !Array.isArray(dataFromApi)) {
        console.error('Dados inválidos recebidos para criar o gráfico:', dataFromApi);
        return;
    }

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
    var qtdeBaixo = dataFromApi.map(item => item.qtde_baixo);
    var qtdeMedio = dataFromApi.map(item => item.qtde_medio);
    var qtdeAlto = dataFromApi.map(item => item.qtde_alto);

    var ctx = document.getElementById('riscoContratoMesChart').getContext('2d');
    riscoContratoMesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Baixo',
                    data: qtdeBaixo,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Médio',
                    data: qtdeMedio,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Alto',
                    data: qtdeAlto,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

async function getDataDashEvasaoCliente() {
    try {
        jsLoading(true);
        const apiUrl = `${URL_API_BASE}/dash/GetDashRiskClient`;
        const res = await fetch(apiUrl);
        if (res.ok) {
            const returnApi = await res.json();
            jsLoading(false);
            criarDashEvasaoClientes(returnApi)
        } else {
            jsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao buscar informações para dashboard de cliente.',
                allowOutsideClick: false,
            });
        }
    } catch (error) {
        jsLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Erro ao buscar informações na API!`,
            allowOutsideClick: false,
        });
    }
}

function criarDashEvasaoClientes(dataFromApi) {
    var ctx = document.getElementById('evasaoClienteChart').getContext('2d');
    var evasaoClienteChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Baixo', 'Médio', 'Alto'],
            datasets: [{
                data: [dataFromApi.qtde_baixo, dataFromApi.qtde_medio, dataFromApi.qtde_alto],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 2)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

async function getDataDashEvasaoContrato() {
    try {
        jsLoading(true);
        const apiUrl = `${URL_API_BASE}/dash/GetDashRiskContract`;
        const res = await fetch(apiUrl);
        if (res.ok) {
            const returnApi = await res.json();
            jsLoading(false);
            criarDashEvasaoContratos(returnApi)
        } else {
            jsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao buscar informações para dashboard de contratos.',
                allowOutsideClick: false,
            });
        }
    } catch (error) {
        jsLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Erro ao buscar informações na API!`,
            allowOutsideClick: false,
        });
    }
}

function criarDashEvasaoContratos(dataFromApi) {
    var ctx = document.getElementById('evasaoContratoChart').getContext('2d');
    var evasaoContratoChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Baixo', 'Médio', 'Alto'],
            datasets: [{
                data: [dataFromApi.qtde_baixo, dataFromApi.qtde_medio, dataFromApi.qtde_alto],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 2)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}



function criarDashClienteMes(dataFromApi) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

    var qtdeBaixo = dataFromApi.map(item => item.qtde_baixo);
    var qtdeMedio = dataFromApi.map(item => item.qtde_medio);
    var qtdeAlto = dataFromApi.map(item => item.qtde_alto);

    var ctx = document.getElementById('riscoClientMesChart').getContext('2d');
    riscoClientMesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Baixo',
                    data: qtdeBaixo,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Médio',
                    data: qtdeMedio,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Alto',
                    data: qtdeAlto,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function downloadRelatorioRiscoClientesCsv() {
    if (!riscoClientMesChart) {
        console.error('Nenhum gráfico encontrado.');
        return;
    }

    var months = riscoClientMesChart.data.labels;
    var datasetBaixo = riscoClientMesChart.data.datasets[0].data;  // Dados do Baixo risco
    var datasetMedio = riscoClientMesChart.data.datasets[1].data;  // Dados do Médio risco
    var datasetAlto = riscoClientMesChart.data.datasets[2].data;   // Dados do Alto risco

    var csvContent = "Mês,Baixo,Médio,Alto\n";

    months.forEach(function (month, index) {
        csvContent += month + "," + datasetBaixo[index] + "," + datasetMedio[index] + "," + datasetAlto[index] + "\n";
    });

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement("a");

    if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "Relatorio_Risco_Cliente.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function downloadRelatorioRiscoContratosCsv() {
    if (!riscoContratoMesChart) {
        console.error('Nenhum gráfico encontrado.');
        return;
    }

    if (!riscoContratoMesChart.data.datasets || riscoContratoMesChart.data.datasets.length < 3) {
        console.error('O gráfico não possui dados suficientes nos datasets.');
        return;
    }

    var months = riscoContratoMesChart.data.labels;
    var datasetBaixo = riscoContratoMesChart.data.datasets[0]?.data || [];  // Dados do Baixo risco
    var datasetMedio = riscoContratoMesChart.data.datasets[1]?.data || [];  // Dados do Médio risco
    var datasetAlto = riscoContratoMesChart.data.datasets[2]?.data || [];   // Dados do Alto risco

    var csvContent = "Mês,Baixo,Médio,Alto\n";

    months.forEach(function (month, index) {
        csvContent += month + "," + datasetBaixo[index] + "," + datasetMedio[index] + "," + datasetAlto[index] + "\n";
    });

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement("a");

    if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "Relatorio_Risco.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

async function getDataDashClientesMesMoney() {
    try {
        jsLoading(true);
        const apiUrl = `${URL_API_BASE}/dash/GetDashRiskMoneyContractMonth`;
        const res = await fetch(apiUrl);
        if (res.ok) {
            const returnApi = await res.json();
            jsLoading(false);
            criarDashClientesMesMoney(returnApi)
        } else {
            jsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao buscar informações para dashboard de valores/contratos por mês.',
                allowOutsideClick: false,
            });
        }
    } catch (error) {
        jsLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Erro ao buscar informações na API!`,
            allowOutsideClick: false,
        });
    }
}

function criarDashClientesMesMoney(dataFromApi) {
    if (!dataFromApi || !Array.isArray(dataFromApi)) {
        console.error('Dados inválidos recebidos para criar o gráfico:', dataFromApi);
        return;
    }

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
    var qtdeBaixo = dataFromApi.map(item => item.qtde_baixo);
    var qtdeMedio = dataFromApi.map(item => item.qtde_medio);
    var qtdeAlto = dataFromApi.map(item => item.qtde_alto);

    var ctx = document.getElementById('riscoClientesMesMoneyChart').getContext('2d');
    riscoClientesMesMoneyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Baixo',
                    data: qtdeBaixo,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Médio',
                    data: qtdeMedio,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Alto',
                    data: qtdeAlto,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

async function getDataDashContratosMesMoney() {
    try {
        jsLoading(true);
        const apiUrl = `${URL_API_BASE}/dash/GetDashRiskMoneyContractMonth`;
        const res = await fetch(apiUrl);
        if (res.ok) {
            const returnApi = await res.json();
            jsLoading(false);
            criarDashContratosMesMoney(returnApi)
        } else {
            jsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao buscar informações para dashboard de valores/contratos por mês.',
                allowOutsideClick: false,
            });
        }
    } catch (error) {
        jsLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Erro ao buscar informações na API!`,
            allowOutsideClick: false,
        });
    }
}

function criarDashContratosMesMoney(dataFromApi) {
    if (!dataFromApi || !Array.isArray(dataFromApi)) {
        console.error('Dados inválidos recebidos para criar o gráfico:', dataFromApi);
        return;
    }

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
    var qtdeBaixo = dataFromApi.map(item => item.qtde_baixo);
    var qtdeMedio = dataFromApi.map(item => item.qtde_medio);
    var qtdeAlto = dataFromApi.map(item => item.qtde_alto);

    var ctx = document.getElementById('riscoContratoMesMoneyChart').getContext('2d');
    riscoContratoMesMoneyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Baixo',
                    data: qtdeBaixo,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Médio',
                    data: qtdeMedio,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Alto',
                    data: qtdeAlto,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function downloadRelatorioRiscoClientesMoneyCsv() {
    if (!riscoClientesMesMoneyChart) {
        console.error('Nenhum gráfico encontrado.');
        return;
    }

    var months = riscoClientesMesMoneyChart.data.labels;
    var datasetBaixo = riscoClientesMesMoneyChart.data.datasets[0].data;  // Dados do Baixo risco
    var datasetMedio = riscoClientesMesMoneyChart.data.datasets[1].data;  // Dados do Médio risco
    var datasetAlto = riscoClientesMesMoneyChart.data.datasets[2].data;   // Dados do Alto risco

    var csvContent = "Mês,Baixo,Médio,Alto\n";

    months.forEach(function (month, index) {
        csvContent += month + "," + datasetBaixo[index] + "," + datasetMedio[index] + "," + datasetAlto[index] + "\n";
    });

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement("a");

    if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "Relatorio_Risco_Cliente_Valor.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
//
function downloadRelatorioRiscoContratosMoneyCsv() {
    if (!riscoContratoMesMoneyChart) {
        console.error('Nenhum gráfico encontrado.');
        return;
    }

    var months = riscoContratoMesMoneyChart.data.labels;
    var datasetBaixo = riscoContratoMesMoneyChart.data.datasets[0].data;  // Dados do Baixo risco
    var datasetMedio = riscoContratoMesMoneyChart.data.datasets[1].data;  // Dados do Médio risco
    var datasetAlto = riscoContratoMesMoneyChart.data.datasets[2].data;   // Dados do Alto risco

    var csvContent = "Mês,Baixo,Médio,Alto\n";

    months.forEach(function (month, index) {
        csvContent += month + "," + datasetBaixo[index] + "," + datasetMedio[index] + "," + datasetAlto[index] + "\n";
    });

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement("a");

    if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "Relatorio_Risco_Contratos_Valor.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}