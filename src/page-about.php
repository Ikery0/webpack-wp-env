<!DOCTYPE html>
<html lang="ja">

<head>
  <?php get_header(); ?>
</head>

<body >
  <?php get_template_part('includes/header'); ?>
  <?php get_template_part('includes/lower-mv'); ?>
  <?php get_template_part('includes/bread'); ?>

  <main class="l-lower-main">
    <div class="l-inner c-block-editor">
      <?php the_content() ?>
    </div>
  </main>


  <?php get_template_part('includes/footer'); ?>
  <?php get_footer(); ?>
</body>

</html>