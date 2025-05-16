### **Jekyll Finance Blog Setup Checklist**  
*(GitHub Pages + Custom Domain)*  

#### **1. Pre-Setup**   
- [x] Repository name: git@github.com:jaidenamari/nectar-flow-finance.git
- [x] Custom domain (e.g., nectarflowfinance.com`) - Added CNAME file

#### **3. Local Jekyll Setup**  
- [x] Verify installations:  
  - Ruby (`>= 2.5.0`)  
  - Bundler (`gem install bundler`)  
  - Jekyll (`gem install jekyll`)  
- [x] Initialize Jekyll:  
  - Run `jekyll new .` (or `jekyll new [dirname]` if starting fresh).  
  - Use `bundle install` to resolve dependencies.  

#### **4. Configuration**  
- [x] Edit `_config.yml`:  
  - Set `title`, `description`, `url` (with custom domain).  
  - Configure `baseurl` if using project repo (e.g., `/nectar-flow-finance).  
  - Add GitHub Pages gem:  
    ```yaml
    plugins:
      - jekyll-feed
      - github-pages
    ```  
- [x] (Optional) Add a theme (using default minima theme with custom styling)  

#### **5. Content Structure**  
- [x] Organize posts in `_posts/` with filenames like `YYYY-MM-DD-title.md`.  
- [x] Add finance-specific categories/tags (created investing and beginners categories).  

#### **6. Local Testing**  
- [x] Run `bundle exec jekyll serve` and verify at `http://localhost:4000`.  
- [ ] Check drafts (if any) with `--drafts` flag.  

#### **7. Deployment**  
- [ ] Push all files to GitHub (`git push origin main`).  
- [ ] Enable GitHub Pages:  
  - Go to **Settings > Pages**.  
  - Select branch (e.g., `main` or `gh-pages`).  
  - Choose `/ (root)` or `/docs` folder.   