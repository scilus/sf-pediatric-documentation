document.addEventListener('DOMContentLoaded', function() {
    const tables = document.querySelectorAll('.sl-markdown-content table');
    
    // Only run on pages with parameter tables
    if (tables.length === 0) return;
    
    let hiddenRowsExist = false;
    const sectionsToHide = [];
    
    tables.forEach((table, tableIndex) => {
        const rows = table.querySelectorAll('tbody tr');
        let hiddenCount = 0;
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 6 && cells[5].textContent.trim() === 'True') {
                row.classList.add('hidden-param');
                hiddenRowsExist = true;
                hiddenCount++;
            }
        });
        
        if (rows.length > 0 && hiddenCount === rows.length) {
            let currentElement = table;
            let heading = null;
            
            while (currentElement.previousElementSibling) {
                currentElement = currentElement.previousElementSibling;
                
                if (currentElement.tagName === 'H3') {
                    heading = currentElement;
                    break;
                }
                
                const h3Inside = currentElement.querySelector('h3');
                if (h3Inside) {
                    heading = currentElement;
                    break;
                }
            }
            
            if (heading) {
                const elementsToHide = [];
                let element = heading;
                
                while (element && element !== table.nextElementSibling) {
                    elementsToHide.push(element);
                    if (element === table) break;
                    element = element.nextElementSibling;
                }
                
                if (elementsToHide.length > 0) {
                    sectionsToHide.push(elementsToHide);
                }
            }
        }
    });
    
    // Create and insert the toggle button if there are hidden rows
    if (hiddenRowsExist) {
        const contentContainer = document.querySelector('.sl-markdown-content');
        const existingButton = document.getElementById('toggle-advanced-params');
        
        // Only create button if it doesn't already exist
        if (contentContainer && !existingButton) {
            const button = document.createElement('button');
            button.id = 'toggle-advanced-params';
            button.textContent = 'Show Advanced Parameters';
            button.style.cssText = 'position: fixed; top: 5rem; right: 2rem; padding: 0.75rem 1.25rem; background: linear-gradient(135deg, var(--sl-color-accent), var(--sl-color-accent-high)); color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; font-size: 0.9rem; z-index: 1000; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; backdrop-filter: blur(10px);';
            
            // Add hover effect
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.25)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            });
            
            // Append button to body so it floats above everything
            document.body.appendChild(button);
        }
    }
    
    const toggleBtn = document.getElementById('toggle-advanced-params');
    if (toggleBtn && hiddenRowsExist) {
        let isHidden = true;
        
        toggleBtn.addEventListener('click', function() {
            isHidden = !isHidden;
            
            tables.forEach(table => {
                const hiddenRows = table.querySelectorAll('tbody tr.hidden-param');
                hiddenRows.forEach(row => {
                    row.style.display = isHidden ? 'none' : 'table-row';
                });
            });
            
            sectionsToHide.forEach(elements => {
                elements.forEach(el => {
                    el.style.display = isHidden ? 'none' : '';
                });
            });
            
            toggleBtn.textContent = isHidden ? 'Show Advanced Parameters' : 'Hide Advanced Parameters';
        });
        
        tables.forEach(table => {
            const hiddenRows = table.querySelectorAll('tbody tr.hidden-param');
            hiddenRows.forEach(row => {
                row.style.display = 'none';
            });
        });
        
        sectionsToHide.forEach(elements => {
            elements.forEach(el => {
                el.style.display = 'none';
            });
        });
    }
});
