import { expect, test } from '@playwright/test';

const topUrl = '/';
const taskUrl = '/task';

// todo ログイン画面実装後修正要。一時的にタスク管理ページへ遷移させている。
test('TOPページアクセスでタスク管理ページへ遷移', async ({ page }) => {
  await page.goto(topUrl);
  await expect(page).toHaveURL(taskUrl);
})

test('タスク追加・移動・削除', async ({ page }) => {
  // タスク追加
  await page.goto(taskUrl);
  await page.getByRole('textbox', { name: 'タスク名 *' }).click();
  await page.getByRole('textbox', { name: 'タスク名 *' }).fill('e2eテストタスク');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: '高' }).click();
  await page.getByRole('button', { name: '日付を選択してください' }).click();
  await page.getByRole('button', { name: 'Saturday, June 28th,' }).click();
  await page.getByRole('button', { name: '追加' }).click();
  // 追加したタスクが存在すること
  const task = page.locator('div').filter({ hasText: /^e2eテストタスク優先度:期日:2025\/06\/28$/ }).first();
  await expect(task).toBeVisible();
  // 詳細ダイアログ確認
  await task.click();
  await expect(page.getByRole('dialog', { name: 'e2eテストタスク' })).toBeVisible();
  await expect(page.getByLabel('e2eテストタスク').getByText('高')).toBeVisible();
  await expect(page.getByLabel('e2eテストタスク').getByText('2025/06/28')).toBeVisible();
  await expect(page.getByLabel('e2eテストタスク').getByText('未着手')).toBeVisible();
  await page.getByRole('dialog', { name: 'タスク' }).locator('span').click();
  await expect(page.getByRole('dialog', { name: 'e2eテストタスク' })).not.toBeVisible();

  // タスク移動
  const from = task;
  const to = page.getByText('着手中');
  await from.dragTo(to);
  // 詳細ダイアログにてタスクが移動先のステータスとなっていること
  await task.click();
  await expect(page.getByLabel('e2eテストタスク').getByText('着手中')).toBeVisible();
  await page.getByRole('dialog', { name: 'タスク' }).locator('span').click();

  // タスク削除
  await page.locator('div').filter({ hasText: /^e2eテストタスク$/ }).locator('span').click();
  await expect(page.getByRole('alertdialog', { name: 'タスクを削除しますか？' })).toBeVisible();
  await page.getByRole('button', { name: '削除する' }).click();
  await expect(page.getByRole('alertdialog', { name: 'タスクを削除しますか？' })).not.toBeVisible();
  // 追加したタスクが削除されていること
  await expect(task).not.toBeVisible();
});

