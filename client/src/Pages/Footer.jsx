export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white px-8 py-6 text-center text-xs text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} MiroNews Inc. All rights reserved.
      </p>
    </footer>
  );
}
