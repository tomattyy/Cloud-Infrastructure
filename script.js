document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refreshBtn');
    const cpuProgress = document.getElementById('cpuProgress');
    const cpuMetric = document.getElementById('cpuMetric');
    const connectionsMetric = document.getElementById('connectionsMetric');
    const bars = document.querySelectorAll('.bar');

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    const updateDashboard = () => {
        // Simulate network request
        refreshBtn.classList.add('loading');
        
        setTimeout(() => {
            // Random CPU Usage between 10% and 95%
            const newCpu = Math.floor(Math.random() * 85) + 10;
            cpuProgress.style.width = `${newCpu}%`;
            
            // Animate number count up for CPU
            animateValue(cpuMetric, parseInt(cpuMetric.innerText), newCpu, 500, "%");

            // Random Active Connections between 800 and 2000
            const newConnections = Math.floor(Math.random() * 1200) + 800;
            const currentConnections = parseInt(connectionsMetric.innerText.replace(/,/g, ''));
            animateValue(connectionsMetric, currentConnections, newConnections, 800, "");

            // Randomize chart bars
            bars.forEach(bar => {
                const newHeight = Math.floor(Math.random() * 80) + 20;
                bar.style.height = `${newHeight}%`;
            });

            refreshBtn.classList.remove('loading');
        }, 800);
    };

    function animateValue(obj, start, end, duration, suffix) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Easing
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * (end - start) + start);
            
            obj.innerHTML = suffix === "" ? formatNumber(current) : current + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    refreshBtn.addEventListener('click', updateDashboard);

    // Initial setup
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.height = `${Math.floor(Math.random() * 80) + 20}%`;
        }, index * 100);
    });
});
