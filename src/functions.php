<?php

/**
 * テーマのセットアップ
 **/
function my_setup() {
  add_theme_support('post-thumbnails'); // アイキャッチ画像を有効化
  add_theme_support('automatic-feed-links'); // 投稿とコメントのRSSフィードのリンクを有効化
  add_theme_support('title-tag'); // タイトルタグ自動生成
  add_theme_support(
    'html5', //HTML5でマークアップ
    array(
      'search-form',
      'comment-form',
      'comment-list',
      'gallery',
      'caption',
    )
  );
}
add_action('after_setup_theme', 'my_setup');

/*サムネイルの有効化*/
add_action('init', function () {
  add_theme_support('post-thumnails');
});

// 投稿のアーカイブページを作成する
function post_has_archive($args, $post_type) {
  if ('post' == $post_type) {
    $args['rewrite'] = true; // リライトを有効にする
    $args['has_archive'] = 'news'; // 任意のスラッグ名
  }
  return $args;
}
add_filter('register_post_type_args', 'post_has_archive', 10, 2);

/**
 * 投稿名を新着情報に変更
 */
function Change_menulabel() {
  global $menu;
  global $submenu;
  $name = '新着情報';
  $menu[5][0] = $name;
  $submenu['edit.php'][5][0] = $name . '一覧';
  $submenu['edit.php'][10][0] = '新規' . $name . '投稿';
}
function Change_objectlabel() {
  global $wp_post_types;
  $name = '新着情報';
  $labels = &$wp_post_types['post']->labels;
  $labels->name = $name;
  $labels->singular_name = $name;
  $labels->add_new = _x('追加', $name);
  $labels->add_new_item = $name . 'の新規追加';
  $labels->edit_item = $name . 'の編集';
  $labels->new_item = '新規' . $name;
  $labels->view_item = $name . 'を表示';
  $labels->search_items = $name . 'を検索';
  $labels->not_found = $name . 'が見つかりませんでした';
  $labels->not_found_in_trash = 'ゴミ箱に' . $name . 'は見つかりませんでした';
}
add_action('init', 'Change_objectlabel');
add_action('admin_menu', 'Change_menulabel');

/**
 * アイキャッチ画像を取得、
 * 設定されていなければデフォルトの画像を取得
 * 
 * @param str $path デフォルト画像のパス
 * @return html 画像を出力するhtml
 */
function my_get_eyecatch() {
  if (has_post_thumbnail()) {
    $id = get_post_thumbnail_id();
    $img = wp_get_attachment_image_src($id, 'large');
  } else {
    $img = [get_template_directory_uri() . '/images/common/mv-default.jpg'];
  }

  return $img;
}
add_filter('wpcf7_autop_or_not', '__return_false');



function my_filter_rest_endpoints($endpoints) {
  if (isset($endpoints['/wp/v2/users'])) {
    unset($endpoints['/wp/v2/users']);
  }
  if (isset($endpoints['/wp/v2/users/(?P[\d]+)'])) {
    unset($endpoints['/wp/v2/users/(?P[\d]+)']);
  }
  return $endpoints;
}
add_filter('rest_endpoints', 'my_filter_rest_endpoints', 10, 1);