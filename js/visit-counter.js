// Contador de visitas discreto
class VisitCounter {
    constructor() {
        this.storageKey = 'siteVisitCount';
        this.sessionKey = 'currentSession';
        this.init();
    }

    init() {
        // Verificar se é uma nova sessão
        if (!sessionStorage.getItem(this.sessionKey)) {
            this.incrementCounter();
            sessionStorage.setItem(this.sessionKey, 'true');
        }
        
        this.displayCounter();
    }

    incrementCounter() {
        let count = this.getCount();
        count++;
        localStorage.setItem(this.storageKey, count.toString());
    }

    getCount() {
        const count = localStorage.getItem(this.storageKey);
        return count ? parseInt(count) : 0;
    }

    displayCounter() {
        const count = this.getCount();
        const counterElement = document.getElementById('visit-counter');
        
        if (counterElement) {
            counterElement.textContent = count.toLocaleString('pt-BR');
            
            // Adicionar animação sutil quando o contador atualiza
            counterElement.style.opacity = '0';
            setTimeout(() => {
                counterElement.style.opacity = '1';
            }, 100);
        }
    }

    // Método para resetar o contador (para testes)
    reset() {
        localStorage.removeItem(this.storageKey);
        sessionStorage.removeItem(this.sessionKey);
        this.displayCounter();
    }
}

// Inicializar o contador quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new VisitCounter();
});

// Função global para resetar (apenas para desenvolvimento)
function resetVisitCounter() {
    const counter = new VisitCounter();
    counter.reset();
}
