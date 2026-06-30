export default function SectionTitle({ title, description }) {
    return (
        <div className="mb-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">{title}</h3>
            {description && <p className="text-xs text-white/30 mt-0.5">{description}</p>}
        </div>
    );
}