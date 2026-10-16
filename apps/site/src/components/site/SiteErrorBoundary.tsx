import { Button } from '@cinna-design/react';
import { Component, type ReactNode } from 'react';
import type { SiteLanguage } from '../../types';
export class SiteErrorBoundary extends Component<
  { children: ReactNode; language: SiteLanguage; resetKey: string },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidUpdate(previous: Readonly<{ resetKey: string }>) {
    if (this.state.failed && previous.resetKey !== this.props.resetKey)
      this.setState({ failed: false });
  }
  render() {
    if (!this.state.failed) return this.props.children;
    const zh = this.props.language === 'zh';
    return (
      <main className="site-error" id="main-content" tabIndex={-1}>
        <h1>{zh ? '页面加载失败' : 'Unable to load this page'}</h1>
        <p role="alert">{zh ? '重新加载页面后再试一次。' : 'Reload the page and try again.'}</p>
        <Button onClick={() => window.location.reload()}>{zh ? '重新加载' : 'Reload page'}</Button>
      </main>
    );
  }
}
