/**
 * 侧边栏切换功能
 * 支持自动收起和手动展开/收起
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'sidebar-collapsed';
  const COLLAPSED_CLASS = 'sidebar-collapsed';

  /**
   * 初始化侧边栏切换功能
   */
  function initSidebarToggle() {
    // 创建切换按钮
    const toggleBtn = createToggleButton();
    document.body.appendChild(toggleBtn);

    // 检查是否在文章页面
    const isPostPage = document.querySelector('article[data-toc]') !== null;

    // 获取保存的状态
    const savedState = localStorage.getItem(STORAGE_KEY);

    // 在文章页面自动收起，或者恢复之前保存的状态
    if (isPostPage && savedState === null) {
      // 首次访问文章页面，自动收起
      collapseSidebar();
    } else if (savedState === 'true') {
      // 恢复收起状态
      collapseSidebar();
    }

    // 绑定点击事件
    toggleBtn.addEventListener('click', toggleSidebar);

    // 添加键盘快捷键 (Ctrl/Cmd + B)
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    });
  }

  /**
   * 创建切换按钮
   */
  function createToggleButton() {
    const btn = document.createElement('button');
    btn.id = 'sidebar-toggle';
    btn.setAttribute('aria-label', '切换侧边栏');
    btn.setAttribute('title', '切换侧边栏 (Ctrl/Cmd + B)');

    const icon = document.createElement('i');
    icon.className = 'fas fa-chevron-left';

    btn.appendChild(icon);
    return btn;
  }

  /**
   * 切换侧边栏
   */
  function toggleSidebar() {
    const isCollapsed = document.body.classList.contains(COLLAPSED_CLASS);

    if (isCollapsed) {
      expandSidebar();
    } else {
      collapseSidebar();
    }
  }

  /**
   * 收起侧边栏
   */
  function collapseSidebar() {
    document.body.classList.add(COLLAPSED_CLASS);
    localStorage.setItem(STORAGE_KEY, 'true');
  }

  /**
   * 展开侧边栏
   */
  function expandSidebar() {
    document.body.classList.remove(COLLAPSED_CLASS);
    localStorage.setItem(STORAGE_KEY, 'false');
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebarToggle);
  } else {
    initSidebarToggle();
  }
})();
