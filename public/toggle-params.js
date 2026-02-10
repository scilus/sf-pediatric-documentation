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
            
            // Check if dark mode is active
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const bgColor = isDark ? 'rgba(30, 30, 35, 0.9)' : 'var(--sl-color-bg-nav)';
            const shadowColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.1)';
            
            button.style.cssText = `position: fixed; top: 4.4rem; right: 2rem; padding: 0.25rem 1rem; background-color: ${bgColor}; color: var(--sl-color-text); border: 1px solid var(--sl-color-gray-5); border-radius: 0.5rem; cursor: pointer; font-weight: 500; font-size: 0.875rem; z-index: 1000; box-shadow: 0 2px 8px ${shadowColor}; transition: all 0.2s ease; backdrop-filter: blur(10px);`;
            
            // Listen for theme changes
            const observer = new MutationObserver(() => {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                const shadowColor = isDark ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.1)';
                button.style.backgroundColor = isDark ? 'rgba(30, 30, 35, 0.9)' : 'var(--sl-color-bg-nav)';
                button.style.boxShadow = `0 2px 8px ${shadowColor}`;
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
            
            // Add hover effect
            button.addEventListener('mouseenter', function() {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                const shadowColorHover = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
                this.style.borderColor = 'var(--sl-color-text-accent)';
                this.style.transform = 'translateY(-1px)';
                this.style.boxShadow = `0 4px 12px ${shadowColorHover}`;
            });
            
            button.addEventListener('mouseleave', function() {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                const shadowColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.1)';
                this.style.borderColor = 'var(--sl-color-gray-5)';
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = `0 2px 8px ${shadowColor}`;
            });
            
            // Append button to body so it floats above everything
            document.body.appendChild(button);
        }
    }
    
    const toggleBtn = document.getElementById('toggle-advanced-params');
    if (toggleBtn && hiddenRowsExist) {
        let isHidden = true;
        
        toggleBtn.addEventListener('click', function() {
            // Find a stable element to use as scroll anchor
            const contentContainer = document.querySelector('.sl-markdown-content');
            let anchorElement = null;
            let anchorOffset = 0;
            
            // Look for any visible heading or table in the viewport
            const potentialAnchors = contentContainer.querySelectorAll('h3, table, p');
            for (const element of potentialAnchors) {
                const rect = element.getBoundingClientRect();
                // Find an element that's visible and not too far from the top
                if (rect.top >= 100 && rect.top < window.innerHeight / 2) {
                    anchorElement = element;
                    anchorOffset = rect.top;
                    break;
                }
            }
            
            // If no element found in the preferred area, try to find any visible element
            if (!anchorElement) {
                for (const element of potentialAnchors) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < window.innerHeight) {
                        anchorElement = element;
                        anchorOffset = rect.top;
                        break;
                    }
                }
            }
            
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
            
            // Restore scroll position relative to the anchor element
            if (anchorElement) {
                // Use setTimeout to ensure DOM has fully updated
                setTimeout(() => {
                    const newRect = anchorElement.getBoundingClientRect();
                    const scrollAdjustment = newRect.top - anchorOffset;
                    if (Math.abs(scrollAdjustment) > 1) { // Only adjust if there's a meaningful difference
                        window.scrollBy({
                            top: scrollAdjustment,
                            behavior: 'instant'
                        });
                    }
                }, 0);
            }
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
